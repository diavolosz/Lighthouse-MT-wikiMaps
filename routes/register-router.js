const express = require('express');
const router  = express.Router();
const bcrypt = require("bcryptjs"); // Hashing library

const user_helpers = require("../db/user_helpers"); // Database helper queries

// Render register page
router.get("/", (req, res) => {
  user_helpers.getUserWithID(req.session.user_id).then((user) => {

    if (user) {
      return res.redirect(`/user/${user.id}`);
    }

    res.render("register", { error: false });
  });
});

// Register user
router.post("/", (req, res) => {

  // Extract form data
  let { name, email } = req.body;
  name = name.trim();
  email = email.trim();
  const formPassword = req.body.password;

  if (!name || !email || !formPassword) {
    return res.render("register", { error: "Please fill in all fields." });
  }

  if (name.search(/\s/g) !== -1) {
    return res.render("register", { error: "Username cannot contain spaces." });
  }

  name = name.replace(/ /g, '').toLowerCase();

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
          return res.render("register", "That email address is unavailable.");
        }
      });
    } else {
      // Send error if username already exists in database
      return res.render("register", "That username is unavailable.");
    }
  });
});





module.exports = router;
