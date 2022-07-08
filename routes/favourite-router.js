const express = require('express');
const router = express.Router();
const userQuery = require('../db/user_helpers');
const favouritesQuery = require('../db/favourite_helpers');

router.post("/:id", (req, res) => {

  let userId = req.session.user_id;

    userQuery.getUserWithID(userId).then((result) => {
    if (!result) {
      return res.status(401).send('You are not authorized to perform this action.');
    }

    let mapId = req.params.id;

    favouritesQuery.getFavouriteByMapAndUser(userId, mapId)
    .then(result => {
      if (!result) {
        favouritesQuery.addFavourites({
          user_id: userId,
          map_id: mapId
        });
      } else {
        favouritesQuery.deleteFavouriteById(result.id);
      }
    })
    .then(() => {
      return res.status(200).send('OK');
    });
  });
});

module.exports = router;

