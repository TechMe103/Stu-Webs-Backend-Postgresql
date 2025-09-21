const prisma = require('../prismaClient.js');
const bcrypt = require('bcrypt');

async function createAdmin() {
  try {
    const hashedPassword = await bcrypt.hash("admin123", 10); // choose secure password

    const admin = await prisma.admin.create({
      data: {
        name: "HOD Sir",
        email: "admin@gmail.com",
        password: hashedPassword,
      },
    });

    console.log("Admin created:", admin);
  } catch (err) {
    console.error("Error creating admin:", err);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
