// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("../lib/db.js");
const db = new Pool(dbParams);
db.connect();

const getFavouritesByUserID = function (user_id) {
  return db.query(`SELECT maps.id, maps.name
                    FROM maps
                    JOIN favourites ON maps.id = favourites.map_id
                    WHERE favourites.user_id = $1;`, [user_id])
    .then((result) => {
      return (result.rows);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const getFavouriteByMapAndUser = function (user_id, map_id) {
  return db.query(`SELECT favourites.id, favourites.user_id, favourites.map_id, maps.name
                    FROM maps
                    JOIN favourites ON maps.id = favourites.map_id
                    WHERE favourites.user_id = $1 AND favourites.map_id = $2;`, [user_id, map_id])
    .then((result) => {
      return (result.rows[0]);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const deleteFavouriteById = function (id) {
  return db.query(`DELETE FROM favourites WHERE id = $1;`, [id])
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
  addFavourites,
  getFavouriteByMapAndUser,
  deleteFavouriteById
};
