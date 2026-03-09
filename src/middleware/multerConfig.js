const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary"); // your cloudinary instance

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: req.body.folderId ? `CloudShelf/${req.body.folderId}` : "CloudShelf/root",
    public_id: `${Date.now()}-${Math.round(Math.random() * 1e9)}`, // unique file name
    resource_type: "auto", // supports images, pdfs, docs, etc.
  }),
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/png", "image/jpeg", "application/pdf"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter,
});

module.exports = upload;