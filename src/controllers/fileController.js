const fileService = require("../services/fileService");
const path = require("path");
const cloudinary = require("../config/cloudinary");

/*
Get files of logged-in user
*/
async function getUserFiles(req, res, next) {
  try {
    const userId = req.user.id;

    const files = await fileService.getFilesByUserId(userId);

    res.render("dashboard", {
      user: req.user,
      files
    });

  } catch (error) {
    next(error);
  }
}

/*
Upload file to root folder (Cloudinary)
*/
async function uploadFile(req, res, next) {
  try {
    const userId = req.user.id;

    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }

    const customName = req.body.customName;
    const extension = path.extname(req.file.originalname);
    const baseName = customName && customName.trim() !== ""
      ? customName.trim()
      : path.parse(req.file.originalname).name;
    const finalName = baseName + extension;

    // Save file info from Cloudinary
    await fileService.createFile({
      userId,
      name: finalName,
      size: req.file.size,
      url: req.file.path, // Cloudinary URL
      folderId: null
    });

    res.redirect("/dashboard");

  } catch (error) {
    next(error);
  }
}

/*
Upload file inside folder (Cloudinary)
*/
async function uploadFileToFolder(req, res, next) {
  try {
    const userId = req.user.id;
    const folderId = Number(req.params.folderId);

    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }

    const folder = await fileService.getFolderById(folderId);

    if (!folder || folder.userId !== userId) {
      return res.status(403).send("Unauthorized folder access");
    }

    const customName = req.body.customName;
    const extension = path.extname(req.file.originalname);
    const baseName = customName && customName.trim() !== ""
      ? customName.trim()
      : path.parse(req.file.originalname).name;
    const finalName = baseName + extension;

    await fileService.createFile({
      userId,
      name: finalName,
      size: req.file.size,
      url: req.file.path, // Cloudinary URL
      folderId
    });

    res.redirect(`/folders/${folderId}`);

  } catch (error) {
    next(error);
  }
}

/*
Delete file
*/
async function deleteFile(req, res, next) {
  try {
    const userId = req.user.id;
    const fileId = Number(req.params.id);

    const file = await fileService.getFileById(fileId);

    if (!file || file.userId !== userId) {
      return res.status(403).send("Unauthorized");
    }

    // Optional: delete from Cloudinary as well
    if (file.url && file.url.includes("res.cloudinary.com")) {
      const urlParts = file.url.split("/");
      const publicIdWithFolder = urlParts.slice(-2).join("/").split(".")[0];
      await cloudinary.uploader.destroy(publicIdWithFolder);
    }

    await fileService.deleteFile(fileId);

    if (file.folderId) {
        res.redirect(`/folders/${file.folderId}`);
    } else {
        res.redirect("/dashboard");
    }

  } catch (error) {
    next(error);
  }
}

/*
Rename file
*/
async function renameFile(req, res, next) {
  try {
    const userId = req.user.id;
    const fileId = Number(req.params.id);

    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).send("File name cannot be empty");
    }

    const file = await fileService.getFileById(fileId);

    if (!file || file.userId !== userId) {
      return res.status(403).send("Unauthorized");
    }

    const extension = path.extname(file.name);
    const finalName = name.trim() + extension;

    await fileService.renameFile(fileId, finalName);

    res.redirect("/dashboard");

  } catch (error) {
    next(error);
  }
}

module.exports = {
  getUserFiles,
  uploadFile,
  uploadFileToFolder,
  deleteFile,
  renameFile
};