const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/dashboard", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const files = await prisma.file.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    const folders = await prisma.folder.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    res.render("dashboard", {
      user: req.user, 
      files,
      folders,
    });

  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;