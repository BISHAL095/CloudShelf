const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getUserFolders = async (userId) => {
  return await prisma.folder.findMany({
    where: { userId: Number(userId) }
  });
};

exports.createFolder = async (name, userId) => {
  return await prisma.folder.create({
    data: {
      name,
      userId: Number(userId)
    }
  });
};

exports.getFolderById = async (id) => {
  return await prisma.folder.findUnique({
    where: { id: Number(id) },
    include: { files: true }
  });
};

exports.updateFolder = async (id, name) => {
  return await prisma.folder.update({
    where: { id: Number(id) },
    data: { name }
  });
};

exports.deleteFolder = async (id) => {
  return await prisma.folder.delete({
    where: { id: Number(id) }
  });
};