const folderService = require("../services/folderService");

exports.index = async (req, res) => {

  const folders = await folderService.getUserFolders(req.user.id);

  res.render("folder/index", { folders });
};


exports.newFolder = (req, res) => {
  res.render("folder/new");
};


exports.createFolder = async (req, res) => {

  const { name } = req.body;

  await folderService.createFolder(name, req.user.id);

  res.redirect("/dashboard");
};


exports.showFolder = async (req, res) => {

  const id = parseInt(req.params.id);

  const folder = await folderService.getFolderById(id, req.user.id);

  if (!folder) {
    return res.status(404).send("Folder not found");
  }

  res.render("folder/show", {
    folder,
    files: folder.files
  });
};


exports.editFolder = async (req, res) => {

  const folder = await folderService.getFolderById(req.params.id, req.user.id);

  if (!folder) {
    return res.status(404).send("Folder not found");
  }

  res.render("folder/edit", { folder });
};


exports.updateFolder = async (req, res) => {

  const { name } = req.body;

  await folderService.updateFolder(req.params.id, name, req.user.id);

  res.redirect("/dashboard");
};


exports.deleteFolder = async (req, res) => {

  await folderService.deleteFolder(req.params.id, req.user.id);

  res.redirect("/dashboard");
};