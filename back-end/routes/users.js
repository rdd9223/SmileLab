var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
const {  exec } = require('child_process');
const authUtil = require('../module/utils/authUtil');
const statusCode = require('../module/utils/statusCode');
const resMessage = require('../module/utils/responseMessage');


/* GET users listing. */
router.post('/', async(req, res) => {
  let sourcePath = path.join(__dirname, `../source/${req.body.userId}`);

  if (!fs.existsSync(sourcePath)) {
    fs.mkdirSync(sourcePath);
  }

  fs.writeFileSync(path.join(sourcePath, "Main.py"), req.body.source);
  sourcePath = sourcePath.replace(/\\/gi ,"/");
  
  const docker = await exec(`docker run --rm -v ${sourcePath}:/usr/src -w /usr/src python:3 python Main.py`, (err, out, stderr) => {

    if (out) {
      res.status(200).send(authUtil.successTrue(statusCode.OK, '컴파일 성공', out))
    } else {
      res.status(200).send(authUtil.successTrue(statusCode.BAD_REQUEST, "컴파일 실패", stderr))
    }
  })
});

router.post('/check', async(req, res) => {

  fs.writeFileSync(path.join(sourcePath, "Main.py"), req.body.source);
  sourcePath = sourcePath.replace(/\\/gi ,"/");

  if (out) {
    res.status(200).send(authUtil.successTrue(statusCode.OK, '컴파일 성공', out))
  } else {
    res.status(200).send(authUtil.successTrue(statusCode.BAD_REQUEST, "컴파일 실패", stderr))
  }
});

module.exports = router;