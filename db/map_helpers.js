// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("../lib/db.js");
const db = new Pool(dbParams);
db.connect();

const getAllMaps = function () {
  return db.query(`SELECT * FROM maps;`)
    .then((result) => {
      return (result.rows[0]);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const getMapByName = function (name) {
  return db.query(`SELECT * FROM maps WHERE name LIKE $1;`, [name])
    .then((result) => {
      return (result.rows[0]);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const addMap = function (map) {                          //variable taken as object
  return db.query(`INSERT INTO maps (name, user_id, latitude, longitude)
  VALUES
  ($1, $2, $3, $4) RETURNING *;`, [map.name, map.user_id, map.latitude, map.longitude])
    .then((result) => {
      return (result.rows[0]);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

module.exports = {
  getAllMaps,
  getMapByName,
  addMap
};
