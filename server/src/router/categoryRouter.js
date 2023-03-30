const express = require("express");
const { categoryController } = require("../controller");
const { categoryMiddleware } = require("../middleware");
const { userMiddleware } = require("../middleware");
const { imageMiddleware } = require("../middleware/imageMiddleware");

const categoryRouter = express.Router();

//카테고리 생성
categoryRouter.post(
  "/",
  userMiddleware.verifyUser,
  userMiddleware.verifyAdmin,
  categoryMiddleware.checkCompleteCategoryFrom("body"),
  categoryController.createCategory
);
//카테고리 목록 조회
categoryRouter.get("/", categoryController.getAllCategories);
categoryRouter.get(
  "/:id",
  categoryMiddleware.checkCategoryIdFrom("params"),
  categoryController.getCategory
);
//카테고리 상품 목록 조회
categoryRouter.get(
  "/products/:category",
  categoryController.getProductsInCategory
);
//카테고리 수정
categoryRouter.put(
  "/:id",
  userMiddleware.verifyUser,
  userMiddleware.verifyAdmin,
  categoryMiddleware.checkCategoryIdFrom("params"),
  categoryMiddleware.checkMinCategoryConditionFrom("body"),
  categoryController.putCategory
);
//카테고리 삭제
categoryRouter.delete(
  "/:id",
  userMiddleware.verifyUser,
  userMiddleware.verifyAdmin,
  categoryMiddleware.checkCategoryIdFrom("params"),
  categoryMiddleware.checkRemainedProduct("params"),
  categoryController.deleteCategory
);

// categoryRouter.post(
//   '/test/image',
//   imageMiddleware.imageUploader.array('image'),
//   (req, res) => {
//     res.send('good!')
//   }
// )

module.exports = categoryRouter;
