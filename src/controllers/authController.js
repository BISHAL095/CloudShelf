const prisma = require("../config/prisma");
const bcrypt = require("bcrypt");
const passport = require("passport");



exports.getLogin = (req, res) => {
  res.render("auth/login", { error: null });
};

exports.getRegister = (req, res) => {
  res.render("auth/register", { error: null });
};


exports.postRegister = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Duplicate email
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.render("auth/register", {
        error: "Email already registered",
      });
    }

    // Hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    //  Redirect to login
    res.redirect("/login");
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).send("Internal Server Error");
  }
};




exports.postLogin = (req, res, next) => {

  passport.authenticate("local", (err, user, info) => {

    if (err) return next(err);

    if (!user) {
      return res.render("auth/login", {
        error: info?.message || "Invalid email or password"
      });
    }

    req.logIn(user, (err) => {
      if (err) return next(err);

      return res.redirect("/dashboard");
    });

  })(req, res, next);

};

// Logout
exports.logout = (req, res) => {
  req.logout(function (err) {
    if (err) {
      console.error("Logout Error:", err);
      return res.status(500).send("Error logging out");
    }
    res.redirect("/login");
  });
};