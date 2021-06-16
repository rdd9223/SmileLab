var express = require("express");
var router = express.Router();

router.use("/", require("./board"));
router.use("/comment", require("./comment"));

module.exports = router;
