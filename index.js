require("dotenv").config();

const express = require("express");
const path = require("path");
const sessionConfig = require("./src/config/session");
const passport = require("passport");

const homeRoute = require("./src/routes/homeRoute");
const authRoute = require("./src/routes/authRoute");
const dashboardRoute = require("./src/routes/dashboardRoute");
const fileRoute = require("./src/routes/fileRoute");
const folderRoute = require("./src/routes/folderRoute");
const methodOverride = require("method-override");


const app = express();
const PORT = process.env.PORT || 3000;

/* ---------- View Engine ---------- */

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("trust proxy", 1);

/* ---------- Static Files ---------- */

app.use(express.static(path.join(__dirname, "public")));

/* ---------- Body Parser ---------- */

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(methodOverride("_method"));
/* ---------- Session + Passport ---------- */

app.use(sessionConfig);

require("./src/config/passport")(passport);

app.use(passport.initialize());
app.use(passport.session());

/* ---------- Global User ---------- */

app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

/* ---------- Routes ---------- */

app.use("/",homeRoute);
app.use("/", authRoute);
app.use("/",dashboardRoute);
app.use("/files", fileRoute);
app.use("/folders", folderRoute);

app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

/* ---------- Server ---------- */

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});