const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  res.render("maps_new");
});
// router.post('/', (req, res) => {
//   console.log("hi")
//   res.render("maps_new");
// });



module.exports = router;
