const { Product } = require("./model");
const util = require("../misc/util");

const productDAO = {
  async create({ name, price, summary, description, company, category, remaining, image, detailImage }) {
    const product = new Product({ name, price, summary, description, company, category, remaining, image, detailImage });
    await product.save();
    return product.toObject();
  },

  async findOne(id) {
    const plainProduct = await Product.findById(id).lean();
    return plainProduct;
  },

  async findMany(filter, page, perPage) {
    const sanitizedFilter = util.sanitizeObject({
      name: filter.name,
      price: filter.price,
      summary: filter.summary,
      description: filter.description,
      company: filter.company,
      category: filter.category,
      remaining: filter.remaining,
      image: filter.image,
      detailImage: filter.detailImage
    });
    const [total, products] = await Promise.all([
      Product.countDocuments({}),
      Product.find(sanitizedFilter)
        .lean()
        .sort({ createdAt: -1 })
        .skip(perPage * (page - 1))
        .limit(perPage),
    ]);
    const totalPage = Math.ceil(total / perPage);
    return { products, total, totalPage };
  },

  async findAll(page, perPage) {
    const [total, products] = await Promise.all([
      Product.countDocuments({}),
      Product.find()
        .lean()
        .sort({ createdAt: -1 })
        .skip(perPage * (page - 1))
        .limit(perPage),
    ]);
    const totalPage = Math.ceil(total / perPage);
    return { products, total, totalPage };
  },

  async updateOne(id, toUpdate) {
    const sanitizedToUpdate = util.sanitizeObject({
      name: toUpdate.name,
      price: toUpdate.price,
      summary: toUpdate.summary,
      description: toUpdate.description,
      company: toUpdate.company,
      category: toUpdate.category,
      remaining: toUpdate.remaining,
      image: toUpdate.image,
      detailImage: toUpdate.detailImage
    });
    const plainUpdatedProduct = await Product.findByIdAndUpdate(
      id,
      sanitizedToUpdate,
      {
        runValidators: true,
        new: true,
      }
    ).lean();
    return plainUpdatedProduct;
  },

  async deleteOne(id) {
    const plainDeletedProduct = await Product.findByIdAndDelete({
      _id: id,
    }).lean();
    return plainDeletedProduct;
  },

  async deleteMany(condition) {
    const sanitizedCondition = util.sanitizeObject({
      name: condition.name,
      price: condition.price,
      summary: condition.summary,
      description: condition.description,
      company: condition.company,
      category: condition.category,
      remaining: condition.remaining,
      image: condition.image,
      detailImage: condition.detailImage
    });
    const plainDeletedProducts = await Product.deleteMany(
      sanitizedCondition
    ).lean();
    return plainDeletedProducts;
  },
};

module.exports = productDAO;
