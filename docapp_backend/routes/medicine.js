var express = require('express');
var router = express.Router();
var upload = require("./multer");
var pool = require("./pool");


router.get('/fetchallmeds', function (req, res, next) {

    pool.query("select * from medicines", function (error, result) {
      if (error) {
        res.status(500).json([])
      }
      else {
        res.status(200).json({ data: result })
      }
    })
  });

module.exports = router;