const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderItemSchema = new Schema(
  {
    product: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "product",
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
    price: {
      type: mongoose.Types.Decimal128,
      required: true,
    },
    image: String,
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("order-item", OrderItemSchema);
