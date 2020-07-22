var express = require("express");
var router = express.Router();

router.use("/", require("./class"));

module.exports = router;
