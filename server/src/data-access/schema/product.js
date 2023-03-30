const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    remaining: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    detailImage: {
      type: String,
      required: true,
    }
  },
  {
    collection: "Product",
    timestamps: true,
    versionKey: false,
  }
);

module.exports = productSchema;
