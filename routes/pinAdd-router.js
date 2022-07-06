const express = require('express');
const router = express.Router();
const mapQuery = require('../db/map_helpers');



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

    console.log(req.body)
    let mapNum = req.body.map_id;

    res.render("pinAdd");

    // mapQuery.getMapById(mapNum)
    //   .then((mapRow) => {

    //     let mapInfo = {
    //       mapRow
    //     };
    //     res.render("pinAdd", mapInfo);
    //   })

    // .catch(err => {
    //   res
    //     .status(500)
    //     .json({ error: err.message });
    // });
  })
  return router
}
