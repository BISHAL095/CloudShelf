
exports.validateRegister = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.render("auth/register", {
      error: "All fields are required",
    });
  }

  if (password.length < 6) {
    return res.render("auth/register", {
      error: "Password must be at least 6 characters",
    });
  }

  next();
};