const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");
const { User } = require("../data-access/model");

// 회원가입 스키마
const signInSchema = Joi.object({
  email: Joi.string()
    .pattern(
      new RegExp(
        "^[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*[.][a-z]{2,3}$"
      )
    )
    .required(),
  password: Joi.string()
    .pattern(
      new RegExp("^(?=.*?[0-9])(?=.*?[#?!@$ %^&*-])(?=.*?[A-Za-z]).{8,}$")
    )
    .required(),
  name: Joi.string().required(),
  address: Joi.string().required(),
  phoneNumber: Joi.string()
    .pattern(new RegExp("^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$"))
    .required(),
});

// 로그인 스키마
const loginSchema = Joi.object({
  email: Joi.string()
    .pattern(
      new RegExp(
        "^[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*[.][a-z]{2,3}$"
      )
    )
    .required(),
  password: Joi.string()
    .pattern(
      new RegExp("^(?=.*?[0-9])(?=.*?[#?!@$ %^&*-])(?=.*?[A-Za-z]).{8,}$")
    )
    .required(),
});

// 회원가입에 필요한 값 체크
const checkCompleteUserFrom = (from) => async (req, res, next) => {
  const { email, name, password, address, phoneNumber } = req[from];

  try {
    await signInSchema.validateAsync({
      email,
      name,
      password,
      address,
      phoneNumber,
    });
  } catch (err) {
    const result = Object.entries(req[from]).reduce((map, [key, value]) => {
      map += "[" + key + ":" + value + "]" + " ";
      return map;
    }, "");
    next(
      new AppError(
        commonErrors.inputError,
        400,
        `${result}: 유효한 데이터셋이 아닙니다.`
      )
    );
  }
  next();
};

// 로그인에 필요한 값 체크
const checkUserFrom = (from) => async (req, res, next) => {
  const { email, password } = req[from];

  try {
    await loginSchema.validateAsync({ email, password });
  } catch (err) {
    const result = Object.entries(req[from]).reduce((map, [key, value]) => {
      map += "[" + key + ":" + value + "]" + " ";
      return map;
    }, "");
    next(
      new AppError(
        commonErrors.inputError,
        400,
        `${result}: 유효한 데이터셋이 아닙니다.`
      )
    );
  }
  next();
};

// 관리자 검증 / 관리자가 아니면 접근 금지
const verifyAdmin = (req, res, next) => {
  const decode_token = jwt_decode(req.cookies.token);
  const { role } = decode_token;
  if (role) {
    next();
    return;
  }
  next(
    new AppError(
      commonErrors.authorizationError,
      400,
      `관리자 계정이 아닙니다.`
    )
  );
};

// 토큰 유효 검증
const verifyUser = (req, res, next) => {
  try {
    jwt.verify(req.cookies.token, process.env.SECRET);
  } catch (err) {
    next(
      new AppError(
        commonErrors.jsonWebTokenError,
        401,
        `JWT 토큰이 만료되었거나 없습니다.` // 로그인 10분이 지났음
      )
    );
  }
  next();
};

// 토큰으로 로그인 유무 검증
const existsToken = (req, res, next) => {
  if (req.cookies.token) {
    next(new AppError(commonErrors.inputError, 400, `로그인되어 있습니다`));
    return;
  }
  next();
};

// 관리자 검증 / 내가 관리자라면 수정과 삭제 불가능
const preventAdmin = (req, res, next) => {
  const decode_token = jwt_decode(req.cookies.token);
  const { role } = decode_token;
  if (role) {
    next(
      new AppError(
        commonErrors.authenticationError,
        400,
        `관리자 계정은 수정 혹은 삭제할 수 없습니다.`
      )
    );
  }
  next();
};

// 관리자 검증 / params로 받은 id가 관리자id라면 수정과 삭제 불가능
const prohibitModifyAdmin = (from) => async (req, res, next) => {
  const { userId } = req[from];
  const data = await User.findOne({ _id: userId });
  if (data.email === "admin@admin.com") {
    next(
      new AppError(
        commonErrors.authenticationError,
        400,
        `관리자 계정은 수정 혹은 삭제할 수 없습니다.`
      )
    );
  }
  next();
};

module.exports = {
  checkCompleteUserFrom,
  checkUserFrom,
  verifyAdmin,
  verifyUser,
  existsToken,
  preventAdmin,
  prohibitModifyAdmin,
};
