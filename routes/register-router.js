const express = require('express');
const router  = express.Router();
const bcrypt = require("bcryptjs"); // Hashing library

const user_helpers = require("../db/user_helpers"); // Database helper queries

// Render register page
router.get("/", (req, res) => {
  res.render("register");
});

// Register user
router.post("/", (req, res) => {

  // Extract form data
  const { name, email } = req.body;
  const formPassword = req.body.password;

  // Check if username already exists in database
  user_helpers.getUserWithName(name).then((result) => {

    if (!result) { // Check if email already exists in database
    user_helpers.getUserWithEmail(email).then((result) => {

      if (!result) {
        const password = bcrypt.hashSync(formPassword, 10); // Hashed password
        user_helpers.addUser({ name, email, password })
        .then((user) => {
          req.session.user_id = user.id;
          return res.redirect('/')
        });
      } else {
        // Send error if email already exists in database
          return res.send("That email address is unavailable.");
        }
      });
    } else {
      // Send error if username already exists in database
      return res.send("Username taken.");
    }
  });
});





module.exports = router;
