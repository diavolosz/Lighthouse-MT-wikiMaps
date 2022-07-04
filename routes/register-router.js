const express = require('express');
const router  = express.Router();
const user_helpers = require("../db/user_helpers.js");

router.get("/", (req, res) => {
  res.render("register");
});

router.post("/", (req, res) => {
  // Extract form data
  const { name, email, password } = req.body;
  console.log(name)
  console.log(email)
  console.log(password)

  // Insert form data into database

  //user_helpers.addUser({ name, email, password });

  // Redirect
  res.redirect('/')
});

module.exports = router;
