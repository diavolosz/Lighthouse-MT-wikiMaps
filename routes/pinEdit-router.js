const e = require('express');
const express = require('express');
const router = express.Router();
const mapQuery = require('../db/map_helpers');
const pinQuery = require('../db/pin_helpers');
const userQuery = require('../db/user_helpers');

module.exports = (db) => {
  router.post("/", (req, res) => {
    let pinId = req.body.pin_id;
    let mapId = req.body.map_id

    userQuery.getUserWithID(req.session.user_id).then((isLoggedIn) => {
      if(!isLoggedIn) {
        return res.redirect("../../../login");
      } else {
        pinQuery.getPinByID(pinId).then(pinToEdit => {
          if (pinToEdit.user_id === req.session.user_id) {
            pinQuery.getPinByID(pinId)
            .then((pinInfo) => {

            templateVar = {
              pinInfo,
              mapId
            }

            return res.render("pinEdit", templateVar);
            });
          } else {
            return res.redirect(`../../../map/${mapId}`);
          }
        });

      }
    });



  });


  router.post('/editing', (req, res) => {

    let pinInfo = req.body;

    pinInfo['user_id'] = req.session.user_id;

    userQuery.getUserWithID(req.session.user_id).then((isLoggedIn) => {
      if(!isLoggedIn) {
        return res.status(401).send("Not authorized.");
      } else {
        pinQuery.getPinByID(pinInfo.pin_id).then(pinToEdit => {
          if (pinToEdit.user_id === req.session.user_id) {
            const user = userQuery.getUserWithID(req.session.user_id);
            const pinEdit = pinQuery.updatePinInfo(pinInfo);

            console.log (pinInfo)

            Promise.all([pinEdit, user])
              .then((values) => {

                res.redirect(`../../../map/${values[0].map_id}`)
              })
              .catch(err => {
                res
                  .status(500)
                  .json({ error: err.message });
              });
          } else {
            return res.status(401).send("Not Authorized.");
          }
        });

      }
    });




  });

  router.get('/get/:map_name', (req, res) => {

    mapQuery.getMapByPinName(req.params.map_name)
      .then((mapRow) => {

        res.json(mapRow);
      })

      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });


  })

  return router
}
