var express = require("express");
var router = express.Router();
const multer = require("multer");

const user_services = require("../services/user");
const collection_services = require("../services/collection");
const product_services = require("../services/product");
const cart_item_services = require("../services/cart-item");
const order_services = require("../services/order");

const storage = (file_dest) =>
  multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `./public/images/${file_dest}`);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix =
        Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(
        null,
        uniqueSuffix +
          "-" +
          file.originalname.replace(/\s+/g, "-").toLowerCase()
      );
    },
  });

const upload_user = multer({
  storage: storage("users"),
});

const upload_collection = multer({
  storage: storage("collections"),
});

const upload_product = multer({
  storage: storage("products"),
});

const upload_cart = multer({
  storage: storage("custom-photos"),
});

// User Routes
router.post("/user/login", user_services.login);
router.post(
  "/user/signup",
  upload_user.single("image"),
  user_services.signup
);
router.post("/user/signup-admin", user_services.signup_admin);
router.post("/user/:id/update", user_services.update);
router.post("/user/:id/delete", user_services.delete);
router.get("/user/:id", user_services.detail);
router.get("/users", user_services.list);

// // Collection Routes
router.post(
  "/collection/create",
  upload_collection.single("image"),
  collection_services.create
);
router.post(
  "/collection/:id/update",
  upload_collection.single("image"),
  collection_services.update
);
router.post("/collection/:id/delete", collection_services.delete);
router.get("/collection/:id", collection_services.detail);
router.get(
  "/collection/:id/products",
  collection_services.list_product_by_collection
);
router.get("/collections", collection_services.list);

// Product Routes
router.post(
  "/product/create",
  upload_product.single("image"),
  product_services.create
);
router.post(
  "/product/:id/update",
  upload_product.single("image"),
  product_services.update
);
router.post("/product/:id/delete", product_services.delete);
router.get("/product/:id", product_services.detail);
router.get("/products", product_services.list);

// Cart Item Routes
router.post(
  "/cart-item/create",
  upload_cart.single("image"),
  cart_item_services.create
);
router.post(
  "/cart-item/:id/update",
  upload_cart.single("image"),
  cart_item_services.update
);
router.post("/cart-item/:id/delete", cart_item_services.delete);
router.get("/cart-item/:id", cart_item_services.detail);
router.get("/cart-item/user/:user_id", cart_item_services.list_user);
router.get("/cart-items", cart_item_services.list);

// Order Routes
router.post("/order/checkout", order_services.checkout);
router.post("/order/:id/status-change", order_services.status_change);
router.get("/order/user/:user_id", order_services.list_user);
router.get("/order/:id", order_services.detail);
router.get("/orders", order_services.list);

// Index Route
router.get("/", function (req, res, next) {
  res.json({ message: "This is the index route of the server" });
});

module.exports = router;
