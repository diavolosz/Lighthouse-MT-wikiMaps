const express = require('express');
const router = express.Router();
const userQuery = require('../db/user_helpers');
const pinQuery = require('../db/pin_helpers');

// router.get("/:id", (req, res) => {
//   res.render("mapId");
// });

// module.exports = router;
module.exports = (db) => {
  router.get("/:id", (req, res) => {
    pinQuery.getPinsByMapID(req.params.id)
      .then((pins) => {
        let templateVar = {
          pins: pins
        };
        console.log (templateVar)
        res.render('template_mapId', templateVar);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
