const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");


const folderController = require("../controllers/folderController");

// Get all folders
router.get("/",authMiddleware, folderController.index);

// Show create form
router.get("/new",authMiddleware, folderController.newFolder);

// Create folder
router.post("/",authMiddleware, folderController.createFolder);

// View folder
router.get("/:id",authMiddleware, folderController.showFolder);

// Edit form
router.get("/:id/edit",authMiddleware, folderController.editFolder);

// Update folder
router.put("/:id",authMiddleware, folderController.updateFolder);

// Delete folder
router.delete("/:id", authMiddleware, folderController.deleteFolder);

module.exports = router;