var express = require("express");
var router = express.Router();

router.use("/auth", require("./auth"));
router.use("/board", require("./board"));
router.use("/class", require("./class"));
router.use("/compile", require("./compile"));
router.use("/message", require("./message"));
router.use("/result", require("./result"));
router.use("/take", require("./take"));

module.exports = router;
