// Database connection setup
const { Pool } = require("pg");
const dbParams = require("../lib/db.js");
const db = new Pool(dbParams);
db.connect();

const getAllUsers = function () {
  return db.query(`SELECT * FROM users;`)
    .then((result) => {
      return (result.rows);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const getUserWithEmail = function (email) {
  return db.query(`SELECT * FROM users WHERE email = $1;`, [email])
    .then((result) => {
      return (result.rows[0]);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const getUserWithName = function (name) {
  return db.query(`SELECT * FROM users WHERE name = $1;`, [name])
    .then((result) => {
      return (result.rows[0]);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const getUserWithID = function (id) {
  return db.query(`SELECT * FROM users WHERE id = $1;`, [id])
    .then((result) => {
      return (result.rows[0]);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const addUser = function (user) {                          //variable taken as object
  return db.query(`INSERT INTO users (name, email, password)
  VALUES
  ($1, $2, $3) RETURNING *;`, [user.name, user.email, user.password])
    .then((result) => {
      return (result.rows[0]);
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
  addUser
};
