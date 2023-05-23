const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "user",
    },
    items: [
      {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "order-item",
      },
    ],
    total_quantity: {
      type: Number,
      required: true,
      default: 1,
    },
    total_price: {
      type: mongoose.Types.Decimal128,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["to progress", "on its way", "delivered"],
      default: "in progress",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("order", OrderSchema);
