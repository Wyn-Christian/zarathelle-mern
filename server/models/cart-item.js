const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartItemSchema = new Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "user",
    },
    product: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "product",
    },
    quantity: {
      type: Number,
      default: 1,
    },
    image: String,
  },
  {
    timestamps: true,
  }
);
CartItemSchema.virtual("image_url").get(function () {
  return `/images/custom-photos/${this.image}`;
});

module.exports = mongoose.model("cart-item", CartItemSchema);
