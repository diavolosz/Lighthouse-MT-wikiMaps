const express = require('express');
const router  = express.Router();
const userQuery = require("../db/user_helpers");
const mapQuery = require("../db/map_helpers");
const helpers = require("../lib/helpers");

router.get('/', (req, res) => {

  let userInfo = null
  userQuery.getUserWithID(req.session.user_id).then((result) => {
    if (result) {
      userInfo = result;
    }
  })

  mapQuery.loadMaps().then((maps) => {
    if (maps.length || req.session.user_id) {
      return res.render("maps", { maps , user: userInfo});
    }
    return res.render("maps", { maps: [], user: userInfo});
  });
});

router.get('/new', (req, res) => {
  return res.render("maps_new", { error: false });
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
      return res.render("maps_new", { error: "You must be logged in to perform that action." });
    }

    let { name, lat, long } = req.body;
    name = name.trim();

    if (!name || ! lat || !long) {
      return res.render("maps_new", { error: "Please fill out all fields." });
    }
    if (!helpers.validateLatLng({ lat, long })) {
      return res.render("maps_new", { error: "You entered invalid coordinates." });
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
