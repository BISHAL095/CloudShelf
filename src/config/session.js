const session = require("express-session");
const PgSession = require("connect-pg-simple")(session);
const pool = require("./pool");

module.exports = session({
  secret: process.env.SESSION_SECRET || "cloudshelf-secret",

  resave: false,
  saveUninitialized: false,

  store: new PgSession({
    pool: pool,
    tableName: "session"
  }),

  cookie: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  }
});