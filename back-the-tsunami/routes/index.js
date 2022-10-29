const express = require('express');
const router = express.Router();

/* GET Version tsunami */
router.get('/', function(req, res, next) {
  res.json("ro");
});

module.exports = router;
