require("dotenv").config();

const express = require("express");
const path = require("path");
const sessionConfig = require("./src/config/session");
const passport = require("passport");

const authRoute = require("./src/routes/authRoute");
const fileRoute = require("./src/routes/fileRoute");
const folderRoute = require("./src/routes/folderRoute");

const app = express();
const PORT = process.env.PORT || 3000;


/* ---------- App Config ---------- */

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* ---------- Session + Passport ---------- */

app.use(sessionConfig);
require("./config/passport")(passport);

app.use(passport.initialize());
app.use(passport.session());

/* ---------- Global View User ---------- */

app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

app.use(express.static("public"));

/* ---------- Routes ---------- */

app.use("/", authRoute);
app.use("/", fileRoute);
app.use("/", folderRoute);

/* ---------- Server ---------- */

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});