"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = __importDefault(require("../services/db"));
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Get move history
router.get('/', auth_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const moves = yield db_1.default.stockMove.findMany({
            include: { product: true, sourceLocation: true, destLocation: true, user: true },
            orderBy: { created_at: 'desc' }
        });
        res.json(moves);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}));
// Create move (Receipt, Delivery, Transfer, Adjustment)
router.post('/', auth_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { product_id, source_location_id, dest_location_id, quantity, type, status } = req.body;
        // Create the move record
        const move = yield db_1.default.stockMove.create({
            data: {
                product_id,
                source_location_id,
                dest_location_id,
                quantity,
                type,
                status,
                created_by: req.user.id
            }
        });
        // If status is DONE, update inventory levels
        if (status === 'DONE') {
            // Logic to increase/decrease stock levels based on move type
            if (type === 'RECEIPT' && dest_location_id) {
                yield db_1.default.inventoryLevel.upsert({
                    where: { product_id_location_id: { product_id, location_id: dest_location_id } },
                    update: { quantity: { increment: quantity } },
                    create: { product_id, location_id: dest_location_id, quantity }
                });
            }
            else if (type === 'DELIVERY' && source_location_id) {
                yield db_1.default.inventoryLevel.update({
                    where: { product_id_location_id: { product_id, location_id: source_location_id } },
                    data: { quantity: { decrement: quantity } }
                });
            }
            else if (type === 'INTERNAL_TRANSFER' && source_location_id && dest_location_id) {
                yield db_1.default.inventoryLevel.update({
                    where: { product_id_location_id: { product_id, location_id: source_location_id } },
                    data: { quantity: { decrement: quantity } }
                });
                yield db_1.default.inventoryLevel.upsert({
                    where: { product_id_location_id: { product_id, location_id: dest_location_id } },
                    update: { quantity: { increment: quantity } },
                    create: { product_id, location_id: dest_location_id, quantity }
                });
            }
            else if (type === 'ADJUSTMENT' && source_location_id) {
                // Assume quantity passed is the NEW TOTAL quantity
                yield db_1.default.inventoryLevel.upsert({
                    where: { product_id_location_id: { product_id, location_id: source_location_id } },
                    update: { quantity }, // Direct set
                    create: { product_id, location_id: source_location_id, quantity }
                });
            }
        }
        res.status(201).json(move);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}));
exports.default = router;
