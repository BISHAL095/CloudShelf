const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const path = require("path");
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary (make sure CLOUDINARY_URL or env vars are set)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

/* Get all files for a user (latest first) */
async function getFilesByUserId(userId) {
  return prisma.file.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" }
  });
}

/* Get one file by ID */
async function getFileById(fileId) {
  return prisma.file.findUnique({ where: { id: fileId } });
}

/* Create a new file record in DB */
async function createFile({ userId, name, size, url, folderId, publicId }) {
  return prisma.file.create({
    data: {
      name,
      size,
      url,        // Cloudinary URL
      userId,
      folderId,
      publicId    // Cloudinary public_id for deletion
    }
  });
}

/* Delete a file (from DB and Cloudinary) */
async function deleteFile(fileId) {
  const file = await getFileById(fileId);
  if (!file) throw new Error("File not found");

  // Delete from Cloudinary if publicId exists
  if (file.publicId) {
    await cloudinary.uploader.destroy(file.publicId);
  }

  return prisma.file.delete({ where: { id: fileId } });
}

/* Rename file */
async function renameFile(fileId, newName) {
  const file = await getFileById(fileId);
  if (!file) throw new Error("File not found");

  const extension = path.extname(file.name);
  return prisma.file.update({
    where: { id: fileId },
    data: { name: newName + extension }
  });
}

/* Get folder by ID (for validation) */
async function getFolderById(folderId) {
  return prisma.folder.findUnique({ where: { id: folderId } });
}

module.exports = {
  getFilesByUserId,
  getFileById,
  createFile,
  deleteFile,
  renameFile,
  getFolderById
};