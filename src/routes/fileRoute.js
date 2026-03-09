const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const fileController = require("../controllers/fileController");
const upload = require("../middleware/multerConfig");

// Get all files of logged-in user
router.get("/", authMiddleware, fileController.getUserFiles);

// Upload file to root
router.post("/", authMiddleware, upload.single("file"), fileController.uploadFile);

// Upload file into a specific folder
router.post(
  "/folder/:folderId",
  authMiddleware,
  upload.single("file"),
  fileController.uploadFileToFolder
);

// Delete file
router.delete("/:id", authMiddleware, fileController.deleteFile);

// Rename file
router.put("/:id", authMiddleware, fileController.renameFile);

module.exports = router;