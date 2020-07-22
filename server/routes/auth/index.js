var express = require("express");
var router = express.Router();

router.use("/signin", require("./signIn"));
router.use("/signup", require("./signUp"));
router.use("/user", require("./user"));

module.exports = router;
