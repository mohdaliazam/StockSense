import { Router } from 'express';
import prisma from '../services/db';
import { authenticate } from '../middleware/auth';

const router = Router();

// Get all products
router.get('/', authenticate, async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: { inventoryLevel: true },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create product
router.post('/', authenticate, async (req, res) => {
  try {
    const { name, sku, category, uom } = req.body;
    const product = await prisma.product.create({
      data: { name, sku, category, uom },
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
