const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: req.body.folderId ? `CloudShelf/${req.body.folderId}` : "CloudShelf/root",
    public_id: file.originalname.split(".")[0], // optional custom name
  }),
});

const parser = multer({ storage });

module.exports = parser;