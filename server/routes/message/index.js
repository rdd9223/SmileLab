var express = require("express");
var router = express.Router();

router.use("/", require("./message"));

module.exports = router;
