var express = require('express');
var router = express.Router();
const statusCode = require('../../module/utils/statusCode');
const responseMessage = require('../../module/utils/responseMessage');
const authUtil = require('../../module/utils/authUtil');

// 게시글 목록 조회
router.get('/', async(req, res) => {

})

// 게시글 상세 조회
router.get('/:boardIdx', async(req, res) => {

})

// 게시글 작성
router.post('/', async(req, res) => {

})

module.exports = router;