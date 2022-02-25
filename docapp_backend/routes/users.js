var express = require("express");
var router = express.Router();
var upload = require("./multer").single('picture')
var pool = require("./pool");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/chatpictures",  function (req, res) {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json({ success: false, err });
    }
    console.log("URL",res.req.file.path)
    return res.status(200).json({ success: true, url: res.req.file.path });
  });
});

module.exports = router;
