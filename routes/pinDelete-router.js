const express = require('express');
const router = express.Router();
const mapQuery = require('../db/map_helpers');
const pinQuery = require('../db/pin_helpers');
const userQuery = require('../db/user_helpers');

module.exports = (db) => {
  router.post('/:id', (req, res) => {

    let pinId = req.body.pin_id;
    let mapId = req.body.map_id

    console.log(req.body.pin_id)
    console.log(req.body.map_id)


    pinQuery.removePinById(pinId)
      .then((value) => {

        res.redirect (`../../map/${mapId}`)
      })

      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  })

  return router
}
