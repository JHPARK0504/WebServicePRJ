const { Category } = require("./model");
const util = require("../misc/util");

const categoryDAO = {
  async create({ title, description, image }) {
    const category = new Category({ title, description, image });
    await category.save();
    return category.toObject();
  },

  async findOne(id) {
    const plainCategory = await Category.findById(id).lean();
    return plainCategory;
  },

  async findAll() {
    const plainCategory = await Category.find().lean();
    return plainCategory;
  },

  async updateOne(id, toUpdate) {
    const sanitizedToUpdate = util.sanitizeObject({
      title: toUpdate.title,
      description: toUpdate.description,
      image: toUpdate.image,
    });
    const plainUpdatedCategory = await Category.findByIdAndUpdate(
      id,
      sanitizedToUpdate,
      {
        runValidators: true,
        new: true,
      }
    ).lean();
    return plainUpdatedCategory;
  },

  async deleteOne(id) {
    const plainDeletedCategory = await Category.findByIdAndDelete({
      _id: id,
    }).lean();
    return plainDeletedCategory;
  },
};

module.exports = categoryDAO;
