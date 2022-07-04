const express = require('express');
const router  = express.Router();
const user_helpers = require("../db/user_helpers");

router.get("/", (req, res) => {
  res.render("login");
});

router.post("/", (req, res) => {
  const { email, password } = req.body;

  user_helpers.getUserWithEmail(email).then((user) => {
    if (user.password === password) {
      return res.redirect('/user/1')
    } else {
      return res.send('Invalid credentials');
    }
  }).catch((err) => {
    console.log(err)
    res.send("Invalid credentials.");
  });

});

module.exports = router;
