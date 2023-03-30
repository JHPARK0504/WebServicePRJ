const { productService } = require("../service");
const util = require("../misc/util");

const productController = {
  async createProduct(req, res, next) {
    try {
      const { name, price, summary, description, company, category, remaining, image, detailImage } = req.body;
      const product = await productService.createProduct({ name, price, summary, description, company, category, remaining, image, detailImage });
      res.status(201).json(util.buildResponse(product));
    } catch (error) {
      next(error);
    }
  },

  async getProduct(req, res, next) {
    try {
      const { id } = req.params;
      const product = await productService.getProduct(id);
      res.json(util.buildResponse(product));
    } catch (error) {
      next(error);
    }
  },

  async getProducts(req, res, next) {
    try {
      const { name, price, summary, description, company, category, remaining, image, detailImage } = req.query;
      const products = await productService.getProducts({ name, price, summary, description, company, category, remaining, image, detailImage });
      res.json(util.buildResponse(products));
    } catch (error) {
      next(error);
    }
  },

  async getAllProducts(req, res, next) {
    try {
      //페이지 번호
      const page = Number(req.query.page || 1);
      //페이지 당 상품 개수
      const perPage = Number(req.query.perPage || 10);

      const { products, total, totalPage } = await productService.getAllProducts(page, perPage);
      res.json(util.buildResponse({ 
        page: page,
        perPage: perPage,
        totalPage: totalPage,
        productCount: total, 
        products 
      }));
    } catch(error) {
      next(error);
    }
  },
  
  async putProduct(req, res, next) {
    try {
      const { id } = req.params;
      const { name, price, summary, description, company, category, remaining, image, detailImage } = req.body;
      const product = await productService.updateProduct(id, { name, price, summary, description, company, category, remaining, image, detailImage });
      res.json(util.buildResponse(product));
    } catch (error) {
      next(error);
    }
  },

  async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;
      const product = await productService.deleteProduct(id);
      res.status(201).json(util.buildResponse({
        status: 201,
        product
      }));
    } catch (error) {
      next(error);
    }
  },

  async deleteProducts(req, res, next) {
    try {
      const { name, price, summary, description, company, category, remaining, image, detailImage } = req.body;
      const products = await productService.deleteProducts({ name, price, summary, description, company, category, remaining, image, detailImage });
      res.json(util.buildResponse(products));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = productController;
