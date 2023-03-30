const express = require("express");
const { productController } = require("../controller");
const { productMiddleware } = require("../middleware");
const { userMiddleware } = require("../middleware");
const productRouter = express.Router();

productRouter.post(
  "/",
  userMiddleware.verifyUser,
  userMiddleware.verifyAdmin,
  productMiddleware.checkCompleteProductFrom("body"),
  productController.createProduct
);

productRouter.get(
  "/:id",
  productMiddleware.checkProductIdFrom("params"),
  productController.getProduct
);

productRouter.get("/", productController.getAllProducts);

productRouter.put(
  "/:id",
  userMiddleware.verifyUser,
  userMiddleware.verifyAdmin,
  productMiddleware.checkProductIdFrom("params"),
  productMiddleware.checkMinProductConditionFrom("body"),
  productController.putProduct
);

productRouter.delete(
  "/:id",
  userMiddleware.verifyUser,
  userMiddleware.verifyAdmin,
  productMiddleware.checkProductIdFrom("params"),
  productController.deleteProduct
);

productRouter.delete(
  "/",
  userMiddleware.verifyUser,
  userMiddleware.verifyAdmin,
  productMiddleware.checkMinProductConditionFrom("body"),
  productController.deleteProducts
);

module.exports = productRouter;
