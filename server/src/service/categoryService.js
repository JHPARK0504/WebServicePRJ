const { categoryDAO } = require("../data-access");

const categoryService = {
  async createCategory({ title, description, image }) {
    const createdCategory = await categoryDAO.create({
      title,
      description,
      image,
    });
    return createdCategory;
  },

  async getCategory(id) {
    const category = await categoryDAO.findOne(id);
    return category;
  },

  async getAllCategories() {
    const categories = await categoryDAO.findAll();
    return categories;
  },

  async updateCategory(id, { title, description, image }) {
    const updatedCategory = await categoryDAO.updateOne(id, {
      title,
      description,
      image,
    });
    return updatedCategory;
  },

  async deleteCategory(id) {
    const deletedCategory = await categoryDAO.deleteOne(id);
    return deletedCategory;
  },
};

module.exports = categoryService;
