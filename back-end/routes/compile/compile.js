var express = require("express");
var router = express.Router();
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const authUtil = require("../../module/utils/authUtil");
const statusCode = require("../../module/utils/statusCode");
const resMessage = require("../../module/utils/responseMessage");

// 컴파일 하기
router.post("/", async (req, res) => {
  let sourcePath = path.join(__dirname, `../source/${req.body.userId}`);
  console.log(sourcePath);

  if (!fs.existsSync(sourcePath, {recursive: true })) {
    fs.mkdirSync(sourcePath, {recursive: true });
  }

  fs.writeFileSync(path.join(sourcePath, "Main.py"), req.body.source);
  sourcePath = sourcePath.replace(/\\/gi, "/");

  const docker = await exec(
    `docker run --rm -v ${sourcePath}:/usr/src -w /usr/src python:3 python Main.py`,
    (err, out, stderr) => {
      if (out) {
        res.status(200).send(authUtil.successTrue(statusCode.OK, "컴파일 성공", out));
      } else {
        res.status(200).send(authUtil.successTrue(statusCode.BAD_REQUEST, "컴파일 실패", stderr));
      }
    }
  );
});

// 컴파일 결과 확인하기
router.post("/result", async (req, res) => {

  let sourcePath = path.join(__dirname, `../source/${req.body.userId}`);

  //console.log(sourcePath);

/*
  python3 astRunner.py test001
  fs.writeFileSync(path.join(sourcePath, "Main.py"), req.body.source);
  sourcePath = sourcePath.replace(/\\/gi, "/");
*/
  let testPath = path.join(__dirname, `../../module/tools/`);
  sourcePath = sourcePath.replace(/\\/gi, "/");
  testPath = testPath.replace(/\\/gi, "/");

  const docker = await exec(
    //`docker run --rm python:3 python3 ../../module/tools/astRunner.py ${req.body.userId}`,
    `docker run --rm -v ${sourcePath}:/usr/src/src  \ -v ${testPath}:/usr/src/test -w /usr/src python:3 python test/astRunner.py ../src/Main.py`,
    (err, out, stderr) => {
      console.log(out)
      console.log(stderr)
      if (out) {
        res.status(200).send(authUtil.successTrue(statusCode.OK, "컴파일 성공", out));
      } else {
        console.log(stderr);
        res.status(200).send(authUtil.successTrue(statusCode.BAD_REQUEST, "컴파일 실패", stderr));
      }
    }
  );
/*
  if (out) {
    res.status(200).send(authUtil.successTrue(statusCode.OK, "컴파일 성공", out));
  } else {
    res.status(200).send(authUtil.successTrue(statusCode.BAD_REQUEST, "컴파일 실패", stderr));
  }*/
});

module.exports = router;
