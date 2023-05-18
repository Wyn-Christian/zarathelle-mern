const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    image: String,
    category: {
      type: String,
      required: true,
      enum: ["ready made", "customizable"],
    },
    collection: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "collection",
    },
    stocks: {
      type: Number,
      default: 1,
    },
    num_sold: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      required: true,
      enum: ["in stocks", "out of stocks"],
      default: "in stocks",
    },
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("product", ProductSchema);

const NumSoldProductSchema = new Schema(
  {
    num_sold: { type: Number, default: 1 },
    timestamp: { type: Date, default: Date.now },
    metadata: {
      product: String,
    },
  },
  {
    timeseries: {
      timeField: "timestamp",
      metaField: "metadata",
    },
  }
);
const NumSoldProduct = mongoose.model("num-sold-product", NumSoldProductSchema);

module.exports = { Product, NumSoldProduct };
