const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");

function sanitizeObject(obj) {
  const result = Object.entries(obj).reduce((map, [key, value]) => {
    if (value !== undefined) {
      map[key] = value;
    }
    return map;
  }, {});
  return result;
}

function buildResponse(data, errorMessage) {
  return {
    error: errorMessage ?? null,
    data,
  };
}

const setUserToken = (res, user) => {
  // 유저 jwt 토큰생성
  // 토큰을 쿠키로 전달
  const token = jwt.sign(user, process.env.SECRET, { expiresIn: 600 });
  // expiresIn : 토큰에 대한 기한 "1d" "1h" 60*60(s) 60:1minute
  const decode_token = jwt_decode(token);
  const isAdmin = decode_token.role;
  const data = { token: token, isAdmin: isAdmin };
  res
    .cookie("token", token, { maxAge: 2628002880, httpOnly: true })
    .json(buildResponse(data));
  // `${decode_token.role}`
  /* res.cookie('token', token, { httpOnly: false, sameSite:"None", maxAge: 30000(ms), secure: false }).json(token)
  maxAge : 쿠키에 대한 기한  
  600000:10m 3600000:1h 86,400,400:1d 2,628,002,880:1month
  */
};

module.exports = {
  buildResponse,
  setUserToken,
  sanitizeObject,
};
