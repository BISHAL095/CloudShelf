const express = require("express");
const router = express.Router();

const folderController = require("../controllers/folderController");

router.get("/", folderController.index);

router.get("/new", folderController.newFolder);

router.post("/", folderController.createFolder);

router.get("/:id", folderController.showFolder);

router.get("/:id/edit", folderController.editFolder);

router.post("/:id/update", folderController.updateFolder);

router.post("/:id/delete", folderController.deleteFolder);

module.exports = router;