const folderService = require("../services/folderService");

/*
List all folders of the logged-in user
*/
exports.index = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const folders = await folderService.getUserFolders(userId);

    res.render("folder/index", { folders });
  } catch (error) {
    next(error);
  }
};

/*
Show form to create a new folder
*/
exports.newFolder = (req, res) => {
  res.render("folder/new");
};

/*
Create a new folder
*/
exports.createFolder = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).send("Folder name cannot be empty");
    }

    await folderService.createFolder(name.trim(), userId);
    res.redirect("/dashboard");
  } catch (error) {
    next(error);
  }
};

/*
Show a folder and its files
*/
exports.showFolder = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const folderId = parseInt(req.params.id);

    const folder = await folderService.getFolderById(folderId, userId);

    if (!folder) return res.status(404).send("Folder not found");

    res.render("folder/show", {
      folder,
      files: folder.files || []
    });
  } catch (error) {
    next(error);
  }
};

/*
Show edit folder form
*/
exports.editFolder = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const folderId = parseInt(req.params.id);

    const folder = await folderService.getFolderById(folderId, userId);

    if (!folder) return res.status(404).send("Folder not found");

    res.render("folder/edit", { folder });
  } catch (error) {
    next(error);
  }
};

/*
Update folder name
*/
exports.updateFolder = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const folderId = parseInt(req.params.id);
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).send("Folder name cannot be empty");
    }

    await folderService.updateFolder(folderId, name.trim(), userId);
    res.redirect("/dashboard");
  } catch (error) {
    next(error);
  }
};

/*
Delete a folder
*/
exports.deleteFolder = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const folderId = parseInt(req.params.id);

    await folderService.deleteFolder(folderId, userId);
    res.redirect("/dashboard");
  } catch (error) {
    next(error);
  }
};