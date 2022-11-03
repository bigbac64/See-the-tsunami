const express = require('express');
const router = express.Router();

/* GET Version tsunami */
router.get('/', function(req, res, next) {
  res.send({version: process.env.npm_package_version});
});

module.exports = router;
