const express = require('express');
const router = express.Router();
const userQuery = require('../db/user_helpers');

router.get("/:id", (req, res) => {
    /**
     * 1. check if logged in and extract user id
     * 2. extract param
     * 3. validate param
     * 4. if user has already favorited, delete
     * 5. if user has not favorited, insert
     */

  let id = req.session.user_id;


  // userQuery.getUserWithID(id).then((result) => {
  // if (!result) {
  //   return res.send("You must login.");
  // }

  // let mapId = req.params.id;
  // res.send(mapId);
  // });

});

module.exports = router;

