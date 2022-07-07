const express = require('express');
const router = express.Router();
const userQuery = require('../db/user_helpers');
const pinQuery = require('../db/pin_helpers');
const mapQuery = require('../db/map_helpers');
const favQuery = require('../db/favourite_helpers');
const { render } = require('ejs');

module.exports = (db) => {
  router.get("/:id", (req, res) => {
    let user = null;
    let mapInfo;
    userQuery.getUserWithID(req.session.user_id).then((result) => {
      if (result) {
        user = result;
      }
    });

    mapQuery.getMapById(req.params.id)
      .then((mapRow) => {
        mapInfo = mapRow;
      });

    pinQuery.getPinsByMapID(req.params.id)
      .then((pins) => {
        let templateVar = {
          pins,
          user,
          mapInfo
        };

        res.render('template_mapId', templateVar);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/get/:id", (req, res) => {
    const map = mapQuery.getMapById(req.params.id)
    const pins = pinQuery.getPinsByMapID(req.params.id)
    const fav = favQuery.getFavouriteByMapAndUser(req.session.user_id, req.params.id);

    Promise.all ([map, pins, fav])
    .then ((values) => {
      res.json (values)
    })

      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  return router;
};


