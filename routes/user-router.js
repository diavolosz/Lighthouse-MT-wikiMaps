const express = require('express');
const router  = express.Router();
const userQuery = require ('../db/user_helpers');
const pinQuery = require ('../db/pin_helpers');

// starts with /user

// router.get("/", (req, res) => {
//   res.render("user");
// });

// module.exports = router;

module.exports = (db) => {
  router.get("/", (req, res) => {
    pinQuery.getPinsByMapID(2, 2)
      .then((pins) => {
        let variables  = {
          pin1name: pins[0].name,
          pin2name: pins[1].name
        }
        res.render('user', variables);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
