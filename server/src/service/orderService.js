const { orderDAO } = require("../data-access");

const orderService = {
  // 사용자 주문 추가
  async createOrder(_id, data) {
    const createdOrder = await orderDAO.create(_id, data);
    return createdOrder;
  },
  // 사용자 주문 내역 조회
  async getOrder({ _id }) {
    const getOrder = await orderDAO.findOne({ _id });
    return getOrder;
  },
  // 관리자 - 전체 주문 내역 조회
  async getAllOrder() {
    const getAllOrder = await orderDAO.find({});
    return getAllOrder;
  },
  // 사용자 주문 수정
  async updateOrder({ id }, { address }) {
    const updatedOrder = await orderDAO.updateOne({ id }, { address });
    return updatedOrder;
  },
  // 관리자 - 사용자 배송 상태 수정
  async updateOrderStatus({ id }, { status }) {
    const updatedOrderStatus = await orderDAO.updateStatus({ id }, { status });
    return updatedOrderStatus;
  },
  // 주문 삭제
  async deleteOrder({ id }) {
    const deletedOrder = await orderDAO.deleteOne({ id });
    return deletedOrder;
  },
};

module.exports = orderService;
