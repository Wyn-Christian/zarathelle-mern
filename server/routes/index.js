var express = require("express");
var router = express.Router();
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      uniqueSuffix + "-" + file.originalname.replace(/\s+/g, "-").toLowerCase()
    );
  },
});

const upload = multer({
  storage: storage,
});

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json({ message: "This is the index route of the server" });
});

module.exports = router;
