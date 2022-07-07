const express = require('express');
const router = express.Router();
const mapQuery = require('../db/map_helpers');
const pinQuery = require('../db/pin_helpers');
const userQuery = require('../db/user_helpers');

module.exports = (db) => {
  router.post("/", (req, res) => {
    let pinId = req.body.pin_id;
    let mapId = req.body.map_id

    pinQuery.getPinByID(pinId)
      .then((pinInfo) => {

        templateVar = {
          pinInfo,
          mapId
        }

        res.render("pinEdit", templateVar);
      })


  });


  router.post('/editing', (req, res) => {

    let pinInfo = req.body
    const user = userQuery.getUserWithID(req.session.user_id)

    pinInfo['user_id'] = req.session.user_id;

    const pinEdit = pinQuery.updatePinInfo(pinInfo)

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
  });

  // router.get('/get/:map_name', (req, res) => {

  //   mapQuery.getMapByPinName(req.params.map_name)
  //     .then((mapRow) => {

  //       res.json(mapRow);
  //     })

  //     .catch(err => {
  //       res
  //         .status(500)
  //         .json({ error: err.message });
  //     });


  // })

  router.get('/get/:pin_name', (req, res) => {

    pinQuery.getPinByName(req.params.pin_name)
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
