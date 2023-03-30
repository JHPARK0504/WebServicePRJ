const { userDAO } = require("../data-access");

const userService = {
  async listUser() {
    const user = await userDAO.find({});
    return user;
  },

  async createUser({ email, name, password, address, phoneNumber }) {
    const createdUser = await userDAO.create({
      email,
      name,
      password,
      address,
      phoneNumber,
    });
    return createdUser;
  },

  async configUser({ _id }) {
    const configUser = await userDAO.findConfig({ _id });
    return configUser;
  },

  async editUser({ _id, email, name, password, address, phoneNumber }) {
    const editUser = await userDAO.editUser({
      _id,
      email,
      name,
      password,
      address,
      phoneNumber,
    });
    return editUser;
  },

  async deleteUser({ _id }) {
    await userDAO.deleteUser({ _id });
  },
};

module.exports = userService;
