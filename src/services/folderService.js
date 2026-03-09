const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getUserFolders = async (userId) => {
  return prisma.folder.findMany({
    where: { userId: Number(userId) }
  });
};

exports.createFolder = async (name, userId) => {
  return prisma.folder.create({
    data: {
      name,
      userId: Number(userId)
    }
  });
};

exports.getFolderById = async (id, userId) => {
  return prisma.folder.findFirst({
    where: {
      id: Number(id),
      userId: Number(userId)
    },
    include: { files: true }
  });
};

exports.updateFolder = async (id, name, userId) => {
  return prisma.folder.updateMany({
    where: {
      id: Number(id),
      userId: Number(userId)
    },
    data: { name }
  });
};

exports.deleteFolder = async (id, userId) => {
  return prisma.folder.deleteMany({
    where: {
      id: Number(id),
      userId: Number(userId)
    }
  });
};