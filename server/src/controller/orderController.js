const util = require("../misc/util");
const jwt_decode = require("jwt-decode");
const { orderService } = require("../service");

const orderController = {
  // 사용자 주문 추가
  async postOrderUser(req, res, next) {
    try {
      // 사용자 토큰 : email, password, _id, role
      const decode_token = jwt_decode(req.cookies.token);
      const { _id } = decode_token; // 현재 사용자의 _id
      const data = req.body;
      console.log(data);
      const file = await orderService.createOrder(_id, data);
      res.status(201).json(util.buildResponse(file));
    } catch (error) {
      next(error);
    }
  },
  // 사용자 주문 내역 조회
  async getOrderUser(req, res, next) {
    try {
      const { id } = req.params;
      const file = await orderService.getOrder(id);
      res.status(201).json(util.buildResponse(file));
    } catch (error) {
      next(error);
    }
  },
  // 사용자 - 전체 주문 내역 조회
  async getAllOrderUser(req, res, next) {
    try {
      const file = await orderService.getAllOrder();
      res.status(201).json(util.buildResponse(file));
    } catch (error) {
      next(error);
    }
  },
  // 관리자 - 사용자 주문 정보 조회
  async getOrderAdmin(req, res, next) {
    try {
      const file = await orderService.listOrder();
      res.status(201).json(util.buildResponse(file));
    } catch (error) {
      next(error);
    }
  },
  // 사용자 주문 수정
  async putOrderUser(req, res, next) {
    try {
      const { id } = req.params;
      const { address } = req.body;
      const file = await orderService.updateOrder(id, { address });
      res.status(201).json(util.buildResponse(file));
    } catch (error) {
      next(error);
    }
  },
  // 관리자 - 사용자 배송 상태 수정
  async putOrderAdmin(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const file = await orderService.updateOrderStatus(id, { status });
      res.status(201).json(util.buildResponse(file));
    } catch (error) {
      next(error);
    }
  },
  // 사용자 주문 삭제
  async deleteOrderUser(req, res, next) {
    try {
      const { id } = req.params;
      const file = await orderService.deleteOrder(id);
      res.status(201).json(util.buildResponse(`주문을 취소하였습니다.`));
    } catch (error) {
      next(error);
    }
  },
  // 관리자 - 사용자 주문 삭제
  async deleteOrderAdmin(req, res, next) {
    try {
      const { id } = req.params;
      await orderService.deleteOrder(id);
      res
        .status(201)
        .json(util.buildResponse(`사용자의 주문 내역을 삭제하였습니다.`));
    } catch (error) {
      next(error);
    }
  },
  // 사용자 주문 완료
  async getFinalizeOrder(req, res, next) {
    try {
      //사용자 토큰 : email, password, _id, role
      const decode_token = jwt_decode(req.cookies.token);
      const { _id } = decode_token; // 현재 사용자의 _id
      const data = req.body;
      console.log(data);
      const file = await orderService.createFinalPage(_id, data);
      res.status(201).json(util.buildResponse(file));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = orderController;
