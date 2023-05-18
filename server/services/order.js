const Order = require("../models/order");
const OrderItem = require("../models/order-item");
const CartItem = require("../models/cart-item");

exports.list = (req, res, next) => {
  Order.find()
    .populate("product")
    .then((result) => res.json(result))
    .catch((err) => next(err));
};

exports.detail = (req, res, next) => {
  Order.findById(req.params.id)
    .populate("product")
    .then((result) => res.json(result))
    .catch((err) => next(err));
};

exports.list_user = (req, res, next) => {
  Order.find({ user: req.params.user_id })
    .then((result) => res.json(result))
    .catch((err) => next(err));
};

exports.checkout = (req, res, next) => {
  const new_order = new Order({
    user: req.body.user_id,
    items: req.body.items,
    total_quantity: req.body.total_quantity,
    total_price: req.body.total_price,
  });

  new_order.save().then(async (result) => {
    let order_items_result = await OrderItem.insertMany(req.body.items);
    console.log(
      `${order_items_result.length} checkout items documents were inserted`
    );
    // let cart_delete_result = await CartItem.deleteMany({
    //   user: req.body.user_id,
    // });
    // console.log(`Deleted ${cart_delete_result.deletedCount} documents`);
    res.json(result);
  });
};

exports.status_change = (req, res, next) => {
  if (req.body.status === "delivered") {
    // update the stocks and num_sold of the product
  }
  Order.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  )
    .then((result) => res.json(result))
    .catch((err) => next(err));
};
