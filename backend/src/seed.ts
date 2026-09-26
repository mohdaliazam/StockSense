import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@stocksense.com';
  const password = 'password123';
  
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    console.log('User already exists. Skipping seed.');
    return;
  }

  const password_hash = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: {
      email,
      password_hash,
      role: 'INVENTORY_MANAGER'
    }
  });

  console.log('Seed successful! Added test user:');
  console.log('Email:', email);
  console.log('Password:', password);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
