// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("../lib/db.js");
const db = new Pool(dbParams);
db.connect();

const getFavouritesByUserID = function (user_id) {
  return db.query(`SELECT DISTINCT maps.name FROM maps
  JOIN favourites ON maps.user_id = favourites.user_id
  WHERE maps.user_id = $1;`, [user_id])
    .then((result) => {
      return (result.rows);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const getFavouritesByMapID = function (map_id) {
  return db.query(`SELECT maps.name FROM maps
  JOIN favourites ON maps.user_id = favourites.user_id
  WHERE map_id = $1;`, [map_id])
    .then((result) => {
      return (result.rows);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const addFavourites = function (favourite) {          //variable taken as object
  return db.query(`INSERT INTO favourites (user_id, map_id)
  VALUES
  ($1, $2) RETURNING *;`, [favourite.user_id, favourite.map_id])
    .then((result) => {
      return (result.rows[0]);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

module.exports = {
  getFavouritesByUserID,
  getFavouritesByMapID,
  addFavourites
};
