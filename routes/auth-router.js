const express = require('express');
const router  = express.Router();
const bcrypt = require("bcryptjs"); // Hashing library

const user_helpers = require("../db/user_helpers");

router.get("/", (req, res) => {
  res.render("login");
});

router.post("/", (req, res) => {
  const { email } = req.body;
  const formPassword = req.body.password;
  let id;

  user_helpers.getUserWithEmail(email).then((user) => {
    if (!user) {
      return res.send('Invalid credentials');
    }

    id = user.id;
    const dbPassword = user.password;

    if (!(bcrypt.compareSync(formPassword, dbPassword))) {
      return res.send('Invalid credentials');
    }

    req.session.user_id = id;
    return res.redirect(`/user/${id}`);

  }).catch((err) => {
    console.log(err)
    res.send("Invalid credentials.");
  });

});

module.exports = router;
