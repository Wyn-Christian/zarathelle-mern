const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CollectionSchema = new Schema(
  {
    title: {
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
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("collection", CollectionSchema);
