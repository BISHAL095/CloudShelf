const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({
  log:
    process.env.NODE_ENV === "development"
      ? ["query", "error", "warn"]
      : ["error"],
});

async function connectDB() {
  try {
    await prisma.$connect();
    console.log(" Prisma Connected");
  } catch (err) {
    console.error("❌ Prisma Connection Error:", err);
  }
}

connectDB();

module.exports = prisma;