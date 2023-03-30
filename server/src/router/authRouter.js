const express = require("express");
const { userController } = require("../controller");
const { userMiddleware } = require("../middleware");
const passport = require("passport");
const { setUserToken } = require("../misc/util");

const authRouter = express.Router();

// 로그인
authRouter.post(
  "/login",
  userMiddleware.checkUserFrom("body"),
  userMiddleware.existsToken,
  passport.authenticate("local"),
  (req, res, next) => {
    setUserToken(res, req.user);
    // res.redirect('/Landing');
  }
);

// 로그아웃
authRouter.get("/logout", userController.logoutUser);

// 토큰 유효 검증
authRouter.get("/verify", userMiddleware.verifyUser, (req, res, next) => {
  res.json(req.cookies.token);
});

module.exports = authRouter;
