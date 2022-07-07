// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("../lib/db.js");
const db = new Pool(dbParams);
db.connect();

const getAllPins = function () {
  return db.query(`SELECT * FROM pins;`)
    .then((result) => {
      return (result.rows);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const getPinByID = function (id) {
  return db.query(`SELECT * FROM pins WHERE id = $1;`, [id])
    .then((result) => {
      return (result.rows[0]);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const getPinByName = function (name) {
  return db.query(`SELECT * FROM pins WHERE name LIKE $1;`, [name])
    .then((result) => {
      return (result.rows[0]);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const getPinByMapID = function (map_id) {
  return db.query(`SELECT * FROM pins WHERE map_id = $1;`, [map_id])
    .then((result) => {
      return (result.rows[0]);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const getPinsByMapID = function (map_id, user_id) {
  return db.query(`SELECT * FROM pins WHERE map_id = $1;`, [map_id])
    .then((result) => {
      return (result.rows);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const getPinByUserID = function (user_id) {
  return db.query(`SELECT * FROM pins WHERE user_id = $1;`, [user_id])
    .then((result) => {
      return (result.rows);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const addPin = function (pin) {                          //variable taken as object
  return db.query(`INSERT INTO pins (name, description, image, address, latitude, longitude, map_id, user_id)
  VALUES
  ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;`,
    [pin.name, pin.description, pin.image, pin.address, pin.latitude, pin.longitude, pin.map_id, pin.user_id])
    .then((result) => {
      return (result.rows[0]);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const removePinById = function (pin) {                //input is the id number
  return db.query(`DELETE FROM pins WHERE id = $1 RETURNING *;`, [pin])
    .then((result) => {
      return (result.rows[0]);
    })
    .catch((error) => {
      console.log(error.message);
    });

};

module.exports = {
  getAllPins,
  getPinByID,
  getPinByName,
  getPinByMapID,
  getPinByUserID,
  getPinsByMapID,
  addPin,
  removePinById
};
