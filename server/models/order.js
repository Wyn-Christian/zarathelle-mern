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
      get: getValue,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["to process", "on its way", "delivered", "cancelled"],
      default: "to process",
    },
  },
  {
    timestamps: true,
    toJSON: {
      getters: true,
    },
  }
);
function getValue(value) {
  if (typeof value !== "undefined") {
    return parseFloat(value.toString());
  }
  return value;
}

module.exports = mongoose.model("order", OrderSchema);
