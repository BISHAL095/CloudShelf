const prisma = require("../config/prisma");

async function getUserByEmail(email) {
  return prisma.user.findUnique({
    where: { email },
  });
}

async function getUserById(id) {
  return prisma.user.findUnique({
    where: { id },
  });
}

module.exports = {
  getUserByEmail,
  getUserById,
};