const { categoryService, productService } = require("../service");
const util = require("../misc/util");

const categoryController = {
  async createCategory(req, res, next) {
    try {
      const { title, description, image } = req.body;
      const category = await categoryService.createCategory({
        title,
        description,
        image,
      });
      res.status(201).json(util.buildResponse(category));
    } catch (error) {
      next(error);
    }
  },

  async getCategory(req, res, next) {
    try {
      const { id } = req.params;
      const category = await categoryService.getCategory(id);
      res.json(util.buildResponse(category));
    } catch (error) {
      next(error);
    }
  },

  async getAllCategories(req, res, next) {
    try {
      const categories = await categoryService.getAllCategories();
      res.json(util.buildResponse(categories));
    } catch (error) {
      next(error);
    }
  },

  async putCategory(req, res, next) {
    try {
      const { id } = req.params;
      const { title, description, image } = req.body;
      const category = await categoryService.updateCategory(id, {
        title,
        description,
        image,
      });
      res.json(util.buildResponse(category));
    } catch (error) {
      next(error);
    }
  },

  async deleteCategory(req, res, next) {
    try {
      const { id } = req.params;
      const category = await categoryService.deleteCategory(id);
      res.status(201).json(util.buildResponse({
        status: 201,
        category
      }));
    } catch (error) {
      next(error);
    }
  },

  async getProductsInCategory(req, res, next) {
    try {
      //페이지 번호
      const page = Number(req.query.page || 1);
      //페이지 당 상품 개수
      const perPage = Number(req.query.perPage || 10);

      const { category } = req.params;
      const { products, total, totalPage } = await productService.getProducts(
        { category: category },
        page,
        perPage
      )
      res.json(util.buildResponse({
        page: page,
        perPage: perPage,
        totalPage: totalPage, 
        productCount: total,
        products
      }));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = categoryController;
