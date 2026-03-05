const fileService = require("../services/fileService");

/*
Get files of logged-in user
*/
async function getUserFiles(req, res, next) {
  try {
    const userId = req.user.id;

    const files = await fileService.getFilesByUserId(userId);

    res.render("file/index", {
      user: req.user,
      files
    });

  } catch (error) {
    next(error);
  }
}

/*
Upload file to root folder
*/
async function uploadFile(req, res, next) {
  try {
    const userId = req.user.id;

    if (!req.file) {
      return res.status(400).send("File not uploaded");
    }

    await fileService.createFile({
      userId,
      name: req.file.originalname,
      size: req.file.size,
      url: "/uploads/" + req.file.filename,
      folderId: null
    });

    res.redirect("/files");

  } catch (error) {
    next(error);
  }
}

/*
Upload file inside folder
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

    await fileService.createFile({
      userId,
      name: req.file.originalname,
      size: req.file.size,
      url: "/uploads/" + req.file.filename,
      folderId
    });

    res.redirect("/files");

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

    await fileService.deleteFile(fileId);

    res.redirect("/files");

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

    await fileService.renameFile(fileId, name.trim());

    res.redirect("/files");

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