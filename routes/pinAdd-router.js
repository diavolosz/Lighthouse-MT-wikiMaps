const express = require('express');
const router = express.Router();
const mapQuery = require('../db/map_helpers');
const pinQuery = require('../db/pin_helpers');
const userQuery = require('../db/user_helpers');

module.exports = (db) => {
  router.post('/', (req, res) => {
    let mapNum = req.body.map_id;

    mapQuery.getMapById(mapNum)
      .then((mapRow) => {

        let mapInfo = {
          mapRow
        };
        res.render("pinAdd", mapInfo);
      })

      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  })

  router.get('/get/:map_name', (req, res) => {
    mapQuery.getMapByName(req.params.map_name)
      .then((mapRow) => {

        res.json(mapRow);
      })

      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  })

  router.post('/adding', (req, res) => {

    let pinInfo = req.body

    // pinQuery.addPin(pinInfo)
    //   .then(() => {
    //     pinInfo['user_id'] = req.session.user_id;

    //     let templateVar = {
    //       pinInfo,
    //       user: null
    //     }

    //     res.render("template_mapId", templateVar);
    //   })



      const pinAdd = pinQuery.addPin(pinInfo)
      const user = userQuery.getUserWithID(req.session.user_id)

      Promise.all ([pinAdd, user])
      .then ((values) => {
        console.log (values)
        res.redirect (`../../map/${values[0].map_id}`)
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  })

  return router
}
