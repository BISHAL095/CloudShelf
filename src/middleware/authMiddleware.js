module.exports = (req, res, next) => {
  try {
    if (req.session && req.session.user) {
      return next();
    }

    return res.redirect("/login");
  } catch (err) {
    console.error("Auth middleware error:", err);
    return res.redirect("/login");
  }
};