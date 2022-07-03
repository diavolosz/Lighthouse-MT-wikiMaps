const { Pool } = require("pg");
const dbParams = require("../lib/db.js");
const db = new Pool(dbParams);

const getAllUsers = function () {
  db.query(`SELECT * FROM users;`)
    .then((result) => {
      return Promise.resolve(result.rows);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const getUserWithEmail = function (email) {
  db.query(`SELECT * FROM users WHERE email LIKE $1;`, [email])
    .then((result) => {
      return Promise.resolve(result.rows[0]);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const getUserWithName = function (name) {
  db.query(`SELECT * FROM users WHERE name LIKE $1;`, [name])
    .then((result) => {
      return Promise.resolve(result.rows[0]);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const getUserWithID = function (id) {
  db.query(`SELECT * FROM users WHERE id = $1;`, [id])
    .then((result) => {
      return Promise.resolve(result.rows[0]);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const addUser = function (user) {                          //variable taken as object
  db.query(`INSERT INTO users (name, email, password)
  VALUES
  ($1, $2, $3) RETURNING *;`, [user.name, user.email, user.password])
    .then((result) => {
      return Promise.resolve(result.rows[0]);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const getAllMaps = function () {
  db.query(`SELECT * FROM maps;`)
    .then((result) => {
      return Promise.resolve(result.rows[0]);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const getMapByName = function (name) {
  db.query(`SELECT * FROM maps WHERE name LIKE $1;`, [name])
    .then((result) => {
      return Promise.resolve(result.rows[0]);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const addMap = function (map) {                          //variable taken as object
  db.query(`INSERT INTO maps (name, user_id, latitude, longitude)
  VALUES
  ($1, $2, $3, $4) RETURNING *;`, [map.name, map.user_id, map.latitude, map.longitude])
    .then((result) => {
      return Promise.resolve(result.rows[0]);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const getAllPins = function () {
  db.query(`SELECT * FROM pins;`)
    .then((result) => {
      return Promise.resolve(result.rows[0]);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const getPinByID = function (id) {
  db.query(`SELECT * FROM pins WHERE id = $1;`, [id])
    .then((result) => {
      return Promise.resolve(result.rows[0]);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const getPinByName = function (name) {
  db.query(`SELECT * FROM pins WHERE name LIKE $1;`, [name])
    .then((result) => {
      return Promise.resolve(result.rows[0]);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const getPinByMapID = function (map_id) {
  db.query(`SELECT * FROM pins WHERE map_id = $1;`, [map_id])
    .then((result) => {
      return Promise.resolve(result.rows[0]);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const getPinByUserID = function (user_id) {
  db.query(`SELECT * FROM pins WHERE user_id = $1;`, [user_id])
    .then((result) => {
      return Promise.resolve(result.rows[0]);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const addPin = function (pin) {                          //variable taken as object
  db.query(`INSERT INTO pins (name, description, image, address, map_id, user_id)
  VALUES
  ($1, $2, $3, $4, $5, $6) RETURNING *;`,
  [pin.name, pin.description, pin.image, pin.address, pin.map_id, pin.user_id])
    .then((result) => {
      return Promise.resolve(result.rows[0]);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const getFavouritesByUserID = function (user_id) {
  db.query(`SELECT DISTINCT maps.name FROM maps
  JOIN favourites ON maps.user_id = favourites.user_id
  WHERE maps.user_id = $1;`, [user_id])
    .then((result) => {
      return Promise.resolve(result.rows);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const getFavouritesByMapID = function (map_id) {
  db.query(`SELECT maps.name FROM maps
  JOIN favourites ON maps.user_id = favourites.user_id
  WHERE map_id = $1;`, [map_id])
    .then((result) => {
      return Promise.resolve(result.rows);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const addFavourites = function (favourite) {          //variable taken as object
  db.query(`INSERT INTO favourites (user_id, map_id)
  VALUES
  ($1, $2) RETURNING *;`, [favourite.user_id, favourite.map_id])
    .then((result) => {
      return Promise.resolve(result.rows[0]);
    })
    .catch((error) => {
      console.log(error.message);
    });
};



module.exports = {
  getAllUsers,
  getUserWithEmail,
  getUserWithName,
  getUserWithID,
  addUser,
  getAllMaps,
  getMapByName,
  addMap,
  getAllPins,
  getPinByID,
  getPinByName,
  getPinByMapID,
  getPinByUserID,
  addPin,
  getFavouritesByUserID,
  getFavouritesByMapID,
  addFavourites
};
