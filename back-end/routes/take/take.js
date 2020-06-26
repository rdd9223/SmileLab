var express = require("express");
var router = express.Router();
const statusCode = require("../../module/utils/statusCode");
const responseMessage = require("../../module/utils/responseMessage");
const authUtil = require("../../module/utils/authUtil");
const jwt = require("../../module/auth/jwt");
const TAKE = require("../../model/Take");

// 클래스 수강하기
router.post("/", jwt.checkLogin, async (req, res) => {
  const { user_idx, type } = req.decoded;
  const { class_idx } = req.body;

  console.log(user_idx, type);
  TAKE.takeClass({ user_idx, class_idx, type })
    .then(({ json }) => {
      res.status(200).send(json);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(200)
        .send(
          authUtil.successFalse(
            statusCode.INTERNAL_SERVER_ERROR,
            responseMessage.INTERNAL_SERVER_ERROR
          )
        );
    });
});

//학생이 듣고 있는 수강과목 조회하기
router.get("/take", jwt.checkLogin, async (req, res) => {
  const { user_idx, type } = req.decoded;

  TAKE.getTake({ user_idx, type })
    .then(({ json }) => {
      res.status(200).send(json);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(200)
        .send(
          authUtil.successFalse(
            statusCode.INTERNAL_SERVER_ERROR,
            responseMessage.INTERNAL_SERVER_ERROR
          )
        );
    });
});



// 수강클래스와 학생 전체 조회하기 -> 교수가 가지고 있는 클래스 조회하기
// 2020 06 22.
// 수정 내용 :
//    쿼리문 작성
//    - 교수가 요청 시, 해당 교수가 가지고 있는 클래스의 이름과 idx를 반환
//    추후 class 로 이동 예정(?)
router.get("/", jwt.checkLogin, async (req, res) => {
  const { user_idx, type } = req.decoded;

  TAKE.getClassInfo({ user_idx, type })
    .then(({ json }) => {
      res.status(200).send(json);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(200)
        .send(
          authUtil.successFalse(
            statusCode.INTERNAL_SERVER_ERROR,
            responseMessage.INTERNAL_SERVER_ERROR
          )
        );
    });
});

// 수강클래스와 학생 전체 조회하기
// 2020 06 22.
// 수정 내용 :
//    추가
//    - 위 get 요청으로 클래스 리스트를 가져온 후, 그 중 클래스 하나가 선택 되었을 때,
//      해당 클래스를 수강하고 있는 학생의 정보를 반환
router.get("/:idx", jwt.checkLogin, async (req, res) => {
  const { type } = req.decoded;
  const { idx } = req.params;

  TAKE.getStudentFromClass({ type, idx })
    .then(({ json }) => {
      res.status(200).send(json);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(200)
        .send(
          authUtil.successFalse(
            statusCode.INTERNAL_SERVER_ERROR,
            responseMessage.INTERNAL_SERVER_ERROR
          )
        );
    });
});

module.exports = router;
