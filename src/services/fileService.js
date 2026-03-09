const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const path = require("path");


/* Get all files for a user (latest first) */
async function getFilesByUserId(userId) {
  return prisma.file.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" }
  });
}

/* Get one file by ID */
async function getFileById(fileId) {
  return prisma.file.findUnique({
    where: { id: fileId }
  });
}

/* Create a new file record */
async function createFile({ userId, name, size, url, folderId }) {
  return prisma.file.create({
    data: {
      name,
      size,
      url,        
      userId,
      folderId
    }
  });
}

/* Delete a file */
async function deleteFile(fileId) {
  return prisma.file.delete({
    where: { id: fileId }
  });
}

/* Rename file */

async function renameFile(fileId, newName) {
  const file = await prisma.file.findUnique({
    where: { id: fileId }
  });

  const extension = path.extname(file.name); // .png, .jpg, etc

  return prisma.file.update({
    where: { id: fileId },
    data: {
      name: newName + extension
    }
  });
}

/* Get folder (used for validation) */
async function getFolderById(folderId) {
  return prisma.folder.findUnique({
    where: { id: folderId }
  });
}

module.exports = {
  getFilesByUserId,
  getFileById,
  createFile,
  deleteFile,
  renameFile,
  getFolderById
};