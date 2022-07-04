const express = require('express');
const router  = express.Router();
const user_helpers = require("../db/user_helpers");


//render register webpage from welcome page sign up
router.get("/", (req, res) => {
  res.render("register");
});

// update database with user info
router.post("/", (req, res) => {

  // Extract form data
  const { name, email, password } = req.body;

  // Check if username already exists in database
  user_helpers.getUserWithName(name).then((result) => {
    if (!result) {
      // Result should be undefined if name is not registered in database
      console.log("Username not found. Proceed to check email.");
      user_helpers.getUserWithEmail(email).then((result) => {

        if (!result) {
          //Result should be undefined if email is not registered in database
          //Proceed to update data with both passed username + email
          console.log("email not found")
          user_helpers.addUser({ name, email, password })
          .then(() => {
            return res.redirect('/')
          });
        } else {
          // Email exists, registration should fail
          console.log("email exist");
        }
      });
    } else {
      // Username exists, registration should fail
      return res.send("Username taken.");
    }
  });
});





module.exports = router;
