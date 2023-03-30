// 주문 정보 - db에 배송 상태가 저장된다.
// 주문 정보 - db에 배송지 정보, 주문 총액, 수령자 이름 및 연락처가 저장된다.

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    productId: {
      // type: mongoose.Schema.Types.ObjectId,
      // ref: "Product",
      type: String,
      required: true,
    },

    userId: {
      // type: mongoose.Schema.Types.ObjectId,
      // ref: "User",
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "배송준비중",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    }
  },
  {
    collection: "Order",
    timestamps: true,
  }
);

module.exports = orderSchema;
