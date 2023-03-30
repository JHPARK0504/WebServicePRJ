const { userService } = require("../service");
const util = require("../misc/util");
const bcrypt = require("bcrypt");
const jwt_decode = require("jwt-decode");

const userController = {
  async configAdminUser(req, res, next) {
    try {
      const data = await userService.listUser();
      res.json(util.buildResponse(data));
    } catch (err) {
      next(err);
    }
  },

  async editAdminUser(req, res, next) {
    try {
      const { userId } = req.params;
      const { email, name, password, address, phoneNumber } = req.body;
      const hashedPassword = password
        ? bcrypt.hashSync(password, 10)
        : password;
      const user = await userService.editUser({
        _id: userId,
        email,
        name,
        password: hashedPassword,
        address,
        phoneNumber,
      });
      res.json(util.buildResponse(user));
    } catch (err) {
      next(err);
    }
  },

  async deleteAdminUser(req, res, next) {
    try {
      const { userId } = req.params;
      await userService.deleteUser({ _id: userId });
      res.json(util.buildResponse(`계정 탈퇴가 완료되었습니다.`));
    } catch (err) {
      next(err);
    }
  },

  async addUser(req, res, next) {
    try {
      const { email, name, password, address, phoneNumber } = req.body;
      const hashedPassword = bcrypt.hashSync(password, 10);
      const user = await userService.createUser({
        email,
        name,
        password: hashedPassword,
        address,
        phoneNumber,
      });
      res.status(201).json(util.buildResponse(user));
    } catch (err) {
      next(err);
    }
  },

  async logoutUser(req, res, next) {
    try {
      req.logout(() => {
        res.cookie("token", null, { maxAge: 0 });
        res.json(util.buildResponse(`로그아웃되었습니다.`));
      });
    } catch (err) {
      next(err);
    }
  },

  async configUser(req, res, next) {
    try {
      const decode_token = jwt_decode(req.cookies.token);
      const { _id } = decode_token;
      const user = await userService.configUser({ _id });
      res.json(util.buildResponse(user));
    } catch (err) {
      next(err);
    }
  },

  async editUser(req, res, next) {
    try {
      const { email, name, password, address, phoneNumber } = req.body;
      const decode_token = jwt_decode(req.cookies.token);
      const { _id } = decode_token;
      const hashedPassword = password
        ? bcrypt.hashSync(password, 10)
        : password;
      const user = await userService.editUser({
        _id,
        email,
        name,
        password: hashedPassword,
        address,
        phoneNumber,
      });
      res.json(util.buildResponse(user));
    } catch (err) {
      next(err);
    }
  },

  async deleteUser(req, res, next) {
    try {
      const decode_token = jwt_decode(req.cookies.token);
      const { _id } = decode_token;
      await userService.deleteUser({ _id });
      req.logout(() => {
        res.cookie("token", null, { maxAge: 0 });
        res.json(util.buildResponse(`회원 탈퇴가 완료되었습니다.`));
      });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = userController;
