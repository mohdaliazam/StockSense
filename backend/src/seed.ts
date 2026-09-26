import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@stocksense.com';
  const password = 'password123';
  
  // 1. Seed User
  let user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    const password_hash = await bcrypt.hash(password, 10);
    user = await prisma.user.create({
      data: { email, password_hash, role: 'INVENTORY_MANAGER' }
    });
    console.log('Created Admin User');
  }

  // 2. Seed Warehouse & Location
  let warehouse = await prisma.warehouse.findFirst();
  if (!warehouse) {
    warehouse = await prisma.warehouse.create({
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
  const productsCount = await prisma.product.count();
  if (productsCount === 0) {
    const loc1 = await prisma.location.findFirst({ where: { name: 'Rack A1 - Heavy Goods' } });
    const loc2 = await prisma.location.findFirst({ where: { name: 'Rack B2 - Electronics' } });

    if (loc1 && loc2) {
      const p1 = await prisma.product.create({
        data: {
          name: 'Steel Rods (10mm)', sku: 'SKU-892', category: 'Raw Materials', uom: 'kg',
          inventoryLevel: { create: { location_id: loc1.id, quantity: 150 } }
        }
      });
      const p2 = await prisma.product.create({
        data: {
          name: 'Office Chairs (Ergonomic)', sku: 'SKU-104', category: 'Furniture', uom: 'units',
          inventoryLevel: { create: { location_id: loc2.id, quantity: 12 } }
        }
      });
      const p3 = await prisma.product.create({
        data: {
          name: 'MacBook Pro M3', sku: 'SKU-999', category: 'Electronics', uom: 'units',
          inventoryLevel: { create: { location_id: loc2.id, quantity: 45 } }
        }
      });

      // 4. Seed Historical Stock Moves (so the ledger looks active)
      await prisma.stockMove.createMany({
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
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
