const express = require("express");
const { orderController } = require("../controller");
const { userMiddleware, orderMiddleware } = require("../middleware");

const orderRouter = express.Router();

// 사용자 - 주문 추가
orderRouter.post(
  "/",
  userMiddleware.verifyUser,
  orderMiddleware.checkCompleteOrderFrom("body"),
  orderController.postOrderUser
);

// 사용자 - 주문 내역 조회
orderRouter.get(
  "/",
  userMiddleware.verifyUser,
  orderController.getOrderUser
);

// 사용자 - 주문 수정
orderRouter.put(
  "/:id",
  userMiddleware.verifyUser,
  orderMiddleware.checkOrderIdFrom("params"),
  orderMiddleware.checkUserOrderConditionFrom("body"),
  orderMiddleware.checkStatus("params"),
  orderController.putOrderUser
);

// 사용자 - 주문 삭제
orderRouter.delete(
  "/:id",
  userMiddleware.verifyUser,
  orderMiddleware.checkOrderIdFrom("params"),
  orderController.deleteOrderUser
);

module.exports = orderRouter;
