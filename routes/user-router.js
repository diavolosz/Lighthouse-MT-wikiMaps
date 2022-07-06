const express = require('express');
const router  = express.Router();
const userQuery = require ('../db/user_helpers');
const pinQuery = require ('../db/pin_helpers');
const favQuery = require ('../db/favourite_helpers');
const mapQuery = require ('../db/map_helpers');



module.exports = (db) => {
  router.get("/", (req, res) => {


    let favouriteMaps
    let contributedMaps
    let myMaps
    let userInfo = null;
    let user = 2

    userQuery.getUserWithID(req.session.user_id).then((result) => {
      if (result) {
        userInfo = result;
      }
    });

      let p1 = favQuery.getFavouritesByUserID(user)
        .then((respond) => {
          console.log(respond)
          favouriteMaps = respond
        })
      let p2 = pinQuery.getPinByUserID(user)
        .then((respond) => {
          console.log(respond)
          contributedMaps = respond
        })
      let p3 = mapQuery.getMapsByUserId(user)
        .then((respond) => {
          console.log(respond)
          myMaps = respond
        })

      Promise.all([p1, p2, p3]).then(() => {
        let templateVars = {
          favouriteMaps: favouriteMaps,
          contributedMaps: contributedMaps,
          myMaps: myMaps,
          user: userInfo
        }
        res.render('user', templateVars);
      })
  });



  return router;
};
