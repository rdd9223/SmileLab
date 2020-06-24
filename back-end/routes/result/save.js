var express = require("express");
var router = express.Router();
const statusCode = require("../../module/utils/statusCode");
const responseMessage = require("../../module/utils/responseMessage");
const authUtil = require("../../module/utils/authUtil");

// 컴파일 결과 저장하기
router.post("/", async (req, res) => {
    console.log("save");
});

module.exports = router;
