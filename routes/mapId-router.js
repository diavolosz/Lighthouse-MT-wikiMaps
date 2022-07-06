const express = require('express');
const router = express.Router();
const userQuery = require('../db/user_helpers');
const pinQuery = require('../db/pin_helpers');
const mapQuery = require('../db/map_helpers');
const { render } = require('ejs');

// router.get("/:id", (req, res) => {
//   res.render("mapId");
// });

// module.exports = router;
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
    // let map;

    // mapQuery.getMapById(req.params.id)
    //   .then((mapNumber) => {
    //     let map = mapNumber;

    //     let mapInfo = {map};
    //   });

    // pinQuery.getPinsByMapID(req.params.id)
    //   .then((pins) => {
    //     let mapInfo = {
    //       map,
    //       pins
    //     }



    //     res.json(mapInfo);
    //   })

    const map = mapQuery.getMapById(req.params.id)
    const pins = pinQuery.getPinsByMapID(req.params.id)

    Promise.all ([map, pins])
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


