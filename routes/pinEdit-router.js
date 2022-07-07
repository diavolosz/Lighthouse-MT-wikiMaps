const express = require('express');
const router = express.Router();
const mapQuery = require('../db/map_helpers');
const pinQuery = require('../db/pin_helpers');
const userQuery = require('../db/user_helpers');

// router.get("/", (req, res) => {


//   res.render("pinEdit");
// });

// module.exports = router;

module.exports = (db) => {
  router.post("/", (req, res) => {
    let pinId = req.body.pin_id;

    pinQuery.getPinByID(pinId)
      .then((pinInfo) => {

        templateVar = {
          pinInfo
        }

        res.render("pinEdit", templateVar);
      })


  });




  // router.post('/adding', (req, res) => {

  //   let pinInfo = req.body


  //   const pinAdd = pinQuery.addPin(pinInfo)
  //   const user = userQuery.getUserWithID(req.session.user_id)

  //   Promise.all([pinAdd, user])
  //     .then((values) => {

  //       console.log (values)
  //       res.redirect(`../../map/${values[0].map_id}`)
  //     })
  //     .catch(err => {
  //       res
  //         .status(500)
  //         .json({ error: err.message });
  //     });



  return router
}
