const { User } = require("./model");

const userDAO = {
  async find({}) {
    const users = await User.find({});
    return users;
  },

  async create({ email, name, password, address, phoneNumber }) {
    const verifyEmail = await User.findOne({ email: email });
    if (!verifyEmail) {
      const user = await User.create({
        email,
        name,
        password,
        address,
        phoneNumber,
      });
      return user;
    } else {
      throw new Error("중복된 이메일입니다.");
    }
  },

  async findConfig({ _id }) {
    const user = await User.findOne({ _id: _id });
    return user;
  },

  async editUser({ _id, email, name, password, address, phoneNumber }) {
    const user = await User.findOneAndUpdate(
      { _id: _id },
      {
        email: email,
        name: name,
        password: password,
        address: address,
        phoneNumber: phoneNumber,
      },
      { new: true }
    );
    return user;
  },

  async deleteUser({ _id }) {
    await User.deleteOne({ _id: _id });
  },
};

module.exports = userDAO;
