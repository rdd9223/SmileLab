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
  const { source, input } = req.body;

  try {
    let sourcePath = path.join(__dirname, `../../source/${req.body.userId}`).replace(/\\/gi, "/");

    if (!fs.existsSync(sourcePath, { recursive: true })) {
      fs.mkdirSync(sourcePath, { recursive: true });
    }

    await fs.writeFileSync(path.join(sourcePath, "Main.py"), source);
    let command = `python3 ${sourcePath}/Main.py`;

    if (input) {
      await fs.writeFileSync(path.join(sourcePath, "input.txt"), input);
      command += `< ${sourcePath}/input.txt`;
    }

    await exec(command, (err, out, stderr) => {
      if (out) {
        res.status(200).send(authUtil.successTrue(statusCode.OK, "컴파일 성공", out));
      } else {
        res.status(200).send(authUtil.successTrue(statusCode.BAD_REQUEST, "컴파일 실패", stderr));
      }
    });
  } catch (err) {
    console.log(err);
    return res
      .status(200)
      .send(authUtil.successTrue(statusCode.INTERNAL_SERVER_ERROR, "컴파일 실패", err));
  }
});

// 컴파일 결과 확인하기
router.post("/result", async (req, res) => {
  const { userId } = req.body;

  let sourcePath = path.join(__dirname, `../../source/${userId}`);
  let testPath = path.join(__dirname, `../../module/tools`);
  sourcePath = sourcePath.replace(/\\/gi, "/");
  testPath = testPath.replace(/\\/gi, "/");

  await exec(`python3 ${testPath}/astRunner.py ${sourcePath}/Main.py`, (err, out, stderr) => {
    if (out) {
      res.status(200).send(authUtil.successTrue(statusCode.OK, "컴파일 성공", out));
    } else {
      res.status(200).send(authUtil.successTrue(statusCode.BAD_REQUEST, "컴파일 실패", stderr));
    }
  });
});

module.exports = router;
