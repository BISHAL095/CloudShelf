const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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
  return prisma.file.update({
    where: { id: fileId },
    data: { name: newName }
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