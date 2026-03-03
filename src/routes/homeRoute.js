const express = require("express");
const router = express.Router();

// Root route
router.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/dashboard");
  }

  res.redirect("/login");
});

module.exports = router;