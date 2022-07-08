// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const cookieSession = require('cookie-session'); // Create encrypted cookie sessions

const app = express();
const morgan = require("morgan");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const cookieKey = process.env.KEY || 'NchentiOUSTlEtaBlIgNuLAPHOthItcHIETeUMEDAtinaUlaroalPhesTRaGeriCamATIOUdecaDefuLtzecodIeLagOuStoLcI';

app.use(cookieSession({
  name: 'session',
  keys: [
    cookieKey
  ]
}));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userRouter = require("./routes/user-router");
const authRouter = require("./routes/auth-router");
const logoutRouter = require("./routes/logout-router");
const registerRouter = require("./routes/register-router");

const mapRoutes = require("./routes/maps");
const mapIdRouter = require("./routes/mapId-router");

const pinAddRouter = require("./routes/pinAdd-router");
const pinDeleteRouter = require("./routes/pinDelete-router");
const pinEditRouter = require("./routes/pinEdit-router");

const favouriteRouter = require("./routes/favourite-router");


// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/user/:id", userRouter(db));
app.use("/register", registerRouter);
app.use("/login", authRouter);
app.use("/logout", logoutRouter);

app.use("/maps", mapRoutes);
app.use("/map", mapIdRouter(db));

app.use("/pin/add", pinAddRouter(db));
app.use ("/pin/delete", pinDeleteRouter(db));
app.use("/pin/:id/edit", pinEditRouter(db));

app.use("/favourite", favouriteRouter);

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  res.render("welcome");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
