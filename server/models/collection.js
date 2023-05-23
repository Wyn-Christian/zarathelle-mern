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

CollectionSchema.virtual("image_url").get(function () {
  return `/images/collections/${this.image}`;
});
module.exports = mongoose.model("collection", CollectionSchema);
