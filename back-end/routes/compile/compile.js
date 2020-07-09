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
  let sourcePath = path.join(__dirname, `../../source/${req.body.userId}`);

  if (!fs.existsSync(sourcePath, { recursive: true })) {
    fs.mkdirSync(sourcePath, { recursive: true });
  }

  fs.writeFileSync(path.join(sourcePath, "Main.py"), req.body.source);
  sourcePath = sourcePath.replace(/\\/gi, "/");

  const runner = await exec(
    // `docker run --rm -v ${sourcePath}:/usr/src -w /usr/src python:3 python Main.py`
    `python3 ${sourcePath}/Main.py`,
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
  let sourcePath = path.join(__dirname, `../../source/${req.body.userId}`);
  let testPath = path.join(__dirname, `../../module/tools`);
  sourcePath = sourcePath.replace(/\\/gi, "/");
  testPath = testPath.replace(/\\/gi, "/");

  const docker = await exec(
    `docker run --rm -v ${sourcePath}:/usr/src/src  \ -v ${testPath}:/usr/src/test -w /usr/src python:3 python test/astRunner.py ../src/Main.py`,
    // `python3 ${testPath}/astRunner.py ${sourcePath}/Main.py`,
    (err, out, stderr) => {
      if (out) {
        res.status(200).send(authUtil.successTrue(statusCode.OK, "컴파일 성공", out));
      } else {
        res.status(200).send(authUtil.successTrue(statusCode.BAD_REQUEST, "컴파일 실패", stderr));
      }
    }
  );
});

module.exports = router;
