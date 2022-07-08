const express = require('express');
const router  = express.Router();
const userQuery = require("../db/user_helpers.js");

router.get("/", (req, res) => {
  userQuery.getUserWithID(req.session.user_id).then((isLoggedIn) => {
    if(!isLoggedIn) {
      return res.redirect(`/maps`);
    }

    return res.render("welcome");
  });
});

module.exports = router;
