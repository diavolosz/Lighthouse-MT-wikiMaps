const express = require('express');
const router  = express.Router();
const userQuery = require ('../db/user_helpers');
const pinQuery = require ('../db/pin_helpers');
const favQuery = require ('../db/favourite_helpers');
const mapQuery = require ('../db/map_helpers');


module.exports = (db) => {
  router.get("/", (req, res) => {

    let favouriteMaps;
    let contributedPins;
    let myMaps;
    let userInfo = null;

    userQuery.getUserWithID(req.session.user_id).then((result) => {
      if (result) {
        userInfo = result;

        let p1 = favQuery.getFavouritesByUserID(userInfo.id)
          .then((respond) => {
            favouriteMaps = respond;
          })
        let p2 = pinQuery.getPinByUserID(userInfo.id)
          .then((respond) => {
            contributedPins = respond;
          })
        let p3 = mapQuery.getMapsByUserId(userInfo.id)
          .then((respond) => {
            myMaps = respond;
          })

        //wait until all information are ready before passing tempalateVars
        Promise.all([p1, p2, p3]).then(() => {
          let templateVars = {
            favouriteMaps: favouriteMaps,
            contributedPins: contributedPins,
            myMaps: myMaps,
            user: userInfo
          }
          res.render('user', templateVars);
        })
      }
    });
  });

  return router;
};
