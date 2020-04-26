var express = require("express");
var router = express.Router();

router.use("/", require("./result"));
router.use("/save", require("./save"));

module.exports = router;
