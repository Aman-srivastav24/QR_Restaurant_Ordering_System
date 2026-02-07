const prisma = require('./prisma');

async function testPrisma() {
  try {
    const menus = await prisma.menuItem.findMany();
    console.log('Menu items:', menus);
  } catch (err) {
    console.error('Prisma test failed:', err);
  } finally {
    await prisma.$disconnect(); // close connection
  }
}

testPrisma();
