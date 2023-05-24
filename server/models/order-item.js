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
      get: getValue,
      required: true,
    },
    image: String,
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
OrderItemSchema.virtual("image_url").get(function () {
  return `/images/custom-photos/${this.image}`;
});
module.exports = mongoose.model("order-item", OrderItemSchema);
