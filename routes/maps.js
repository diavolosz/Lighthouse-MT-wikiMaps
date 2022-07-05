const express = require('express');
const router  = express.Router();

const userQuery = require("../db/user_helpers");
const mapQuery = require("../db/map_helpers");

const helpers = require("../lib/helpers");

router.get('/', (req, res) => {
  res.send("get maps");
});

router.get('/new', (req, res) => {
  res.render("maps_new");
});

router.post('/', (req, res) => {
  /**
   * 1. Check if user is logged in
   * 2. extract form data
   * 3. validate form data
   * 4. insert data into table
   * 5. redirect to map/:id
   */
  let id = req.session.user_id;
   userQuery.getUserWithID(id).then((result) => {
    if (!result) {
      return res.send("You must be logged in to perform that action.");
    }

    const { name, lat, long } = req.body;

    if (!helpers.validateLatLng({ lat, long })) {
      return res.send(`You entered invalid coordinates.`);
    }

    mapQuery.addMap({
      name,
      latitude: lat,
      longitude: long,
      user_id: id
    }).then(result => {
      return res.redirect(`/map/${result.id}`);
    });
  });


});

module.exports = router;
