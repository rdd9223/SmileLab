var express = require("express");
var router = express.Router();

router.use("/", require("./take"));

module.exports = router;
