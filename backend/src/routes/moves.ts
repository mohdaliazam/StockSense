import { Router } from 'express';
import prisma from '../services/db';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();

// Get move history
router.get('/', authenticate, async (req, res) => {
  try {
    const moves = await prisma.stockMove.findMany({
      include: { product: true, sourceLocation: true, destLocation: true, user: true },
      orderBy: { created_at: 'desc' }
    });
    res.json(moves);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create move (Receipt, Delivery, Transfer, Adjustment)
router.post('/', authenticate, async (req: AuthRequest, res) => {
  try {
    const { product_id, source_location_id, dest_location_id, quantity, type, status } = req.body;
    
    // Create the move record
    const move = await prisma.stockMove.create({
      data: {
        product_id,
        source_location_id,
        dest_location_id,
        quantity,
        type,
        status,
        created_by: req.user!.id
      }
    });

    // If status is DONE, update inventory levels
    if (status === 'DONE') {
      // Logic to increase/decrease stock levels based on move type
      if (type === 'RECEIPT' && dest_location_id) {
        await prisma.inventoryLevel.upsert({
          where: { product_id_location_id: { product_id, location_id: dest_location_id } },
          update: { quantity: { increment: quantity } },
          create: { product_id, location_id: dest_location_id, quantity }
        });
      } else if (type === 'DELIVERY' && source_location_id) {
        await prisma.inventoryLevel.update({
          where: { product_id_location_id: { product_id, location_id: source_location_id } },
          data: { quantity: { decrement: quantity } }
        });
      } else if (type === 'INTERNAL_TRANSFER' && source_location_id && dest_location_id) {
        await prisma.inventoryLevel.update({
          where: { product_id_location_id: { product_id, location_id: source_location_id } },
          data: { quantity: { decrement: quantity } }
        });
        await prisma.inventoryLevel.upsert({
          where: { product_id_location_id: { product_id, location_id: dest_location_id } },
          update: { quantity: { increment: quantity } },
          create: { product_id, location_id: dest_location_id, quantity }
        });
      } else if (type === 'ADJUSTMENT' && source_location_id) {
        // Assume quantity passed is the NEW TOTAL quantity
        await prisma.inventoryLevel.upsert({
          where: { product_id_location_id: { product_id, location_id: source_location_id } },
          update: { quantity }, // Direct set
          create: { product_id, location_id: source_location_id, quantity }
        });
      }
    }

    res.status(201).json(move);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
