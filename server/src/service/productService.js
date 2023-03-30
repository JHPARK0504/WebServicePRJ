const { productDAO } = require("../data-access");

const productService = {
  async createProduct({ name, price, summary, description, company, category, remaining, image, detailImage }) {
    const createdProduct = await productDAO.create({
      name, 
      price, 
      summary, 
      description, 
      company, 
      category,
      remaining, 
      image,
      detailImage
    });
    return createdProduct;
  },

  async getProduct(id) {
    const product = await productDAO.findOne(id);
    return product;
  },

  async getProducts({ name, price, summary, description, company, category, remaining, image, detailImage }, page, perPage) {
    const products = await productDAO.findMany({ name, price, summary, description, company, category, remaining, image, detailImage }, page, perPage);
    return products;
  },

  async getAllProducts(page, perPage) {
    const products = await productDAO.findAll(page, perPage);
    return products;
  },

  async updateProduct(id, { name, price, summary, description, company, category, remaining, image, detailImage }) {
    const updatedProduct = await productDAO.updateOne(id, { name, price, summary, description, company, category, remaining, image, detailImage });
    return updatedProduct;
  },

  async deleteProduct(id) {
    const deletedPost = await productDAO.deleteOne(id);
    return deletedPost;
  },

  async deleteProducts({ name, price, summary, description, company, category, remaining, image, detailImage }) {
    const deletedProducts = await productDAO.deleteMany({ name, price, summary, description, company, category, remaining, image, detailImage });
    return deletedProducts;
  },
};

module.exports = productService;
