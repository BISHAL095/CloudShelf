const express = require("express");
const passport = require("passport");
const authController = require("../controllers/authController");

const router = express.Router();

// Render pages
router.get("/login", authController.getLogin);
router.get("/register", authController.getRegister);

// Register user
router.post("/register", authController.postRegister);

// Login user
router.post("/login", authController.postLogin);

// Logout
router.get("/logout", authController.logout);

module.exports = router;