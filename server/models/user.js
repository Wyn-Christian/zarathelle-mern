const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    address: String,
    phone: String,
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: String,
    position: {
      type: String,
      required: true,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.virtual("image_url").get(function () {
  return `/images/users/${this.image}`;
});
UserSchema.virtual("full_name").get(function () {
  return `${this.first_name} ${this.last_name}`;
});

module.exports = mongoose.model("user", UserSchema);
