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
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const email = 'admin@stocksense.com';
        const password = 'password123';
        // 1. Seed User
        let user = yield prisma.user.findUnique({ where: { email } });
        if (!user) {
            const password_hash = yield bcryptjs_1.default.hash(password, 10);
            user = yield prisma.user.create({
                data: { email, password_hash, role: 'INVENTORY_MANAGER' }
            });
            console.log('Created Admin User');
        }
        // 2. Seed Warehouse & Location
        let warehouse = yield prisma.warehouse.findFirst();
        if (!warehouse) {
            warehouse = yield prisma.warehouse.create({
                data: {
                    name: 'Main Distribution Center',
                    location: 'Hyderabad, India',
                    locations: {
                        create: [
                            { name: 'Rack A1 - Heavy Goods' },
                            { name: 'Rack B2 - Electronics' }
                        ]
                    }
                },
                include: { locations: true }
            });
            console.log('Created Warehouse & Racks');
        }
        // 3. Seed Products
        const productsCount = yield prisma.product.count();
        if (productsCount === 0) {
            const loc1 = yield prisma.location.findFirst({ where: { name: 'Rack A1 - Heavy Goods' } });
            const loc2 = yield prisma.location.findFirst({ where: { name: 'Rack B2 - Electronics' } });
            if (loc1 && loc2) {
                const p1 = yield prisma.product.create({
                    data: {
                        name: 'Steel Rods (10mm)', sku: 'SKU-892', category: 'Raw Materials', uom: 'kg',
                        inventoryLevel: { create: { location_id: loc1.id, quantity: 150 } }
                    }
                });
                const p2 = yield prisma.product.create({
                    data: {
                        name: 'Office Chairs (Ergonomic)', sku: 'SKU-104', category: 'Furniture', uom: 'units',
                        inventoryLevel: { create: { location_id: loc2.id, quantity: 12 } }
                    }
                });
                const p3 = yield prisma.product.create({
                    data: {
                        name: 'MacBook Pro M3', sku: 'SKU-999', category: 'Electronics', uom: 'units',
                        inventoryLevel: { create: { location_id: loc2.id, quantity: 45 } }
                    }
                });
                // 4. Seed Historical Stock Moves (so the ledger looks active)
                yield prisma.stockMove.createMany({
                    data: [
                        { product_id: p1.id, dest_location_id: loc1.id, quantity: 200, type: 'RECEIPT', status: 'DONE', created_by: user.id },
                        { product_id: p1.id, source_location_id: loc1.id, quantity: 50, type: 'DELIVERY', status: 'DONE', created_by: user.id },
                        { product_id: p2.id, dest_location_id: loc2.id, quantity: 15, type: 'RECEIPT', status: 'DONE', created_by: user.id },
                        { product_id: p2.id, source_location_id: loc2.id, quantity: 3, type: 'DELIVERY', status: 'DONE', created_by: user.id },
                        { product_id: p3.id, dest_location_id: loc2.id, quantity: 45, type: 'RECEIPT', status: 'DONE', created_by: user.id },
                    ]
                });
                console.log('Created Products and Move History');
            }
        }
        console.log('Database successfully seeded with rich demo data!');
    });
}
main()
    .catch(e => {
    console.error(e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
