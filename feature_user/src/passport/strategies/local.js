const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../../data-access/model');
const bcrypt = require('bcrypt');
const Config = require('../../config');

const config = {
  usernameField: 'email',
  passwordField: 'password',
};

const local = new LocalStrategy(config, async (email, password, done) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('회원을 찾을 수 없습니다.');
    }
    if (!bcrypt.compareSync(password, user.password)) {
      throw new Error("비밀번호가 일치하지 않습니다.");
    }
    const isAdmin = user._id.toString() === Config.admin;

    done (null, {
      email: user.email,
      password: user.password,
      _id: user._id,
      role: isAdmin
    });
  } catch (err) {
    done(err, null);
  }
});

module.exports = local;