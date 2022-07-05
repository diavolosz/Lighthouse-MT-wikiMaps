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
    let test = "testing"
    let user = 2

      let p1 = favQuery.getFavouritesByUserID(user)
        .then((respond) => {
          favouriteMaps = respond
          console.log(favouriteMaps)
        })
      let p2 = pinQuery.getPinByUserID(user)
        .then((respond) => {
          contributedMaps = respond
          console.log(contributedMaps)
        })
      let p3 = mapQuery.getMapsByUserId(user)
        .then((respond) => {
          myMaps = respond
          console.log(myMaps)
        })

      Promise.all([p1, p2, p3]).then(() => {
        let templateVars = {
          favouriteMaps: favouriteMaps,
          contributedMaps: contributedMaps,
          myMaps: myMaps,
          test: test
        }
        res.render('user', templateVars);
      })
  });
  return router;
};
