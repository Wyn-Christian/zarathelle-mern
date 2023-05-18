const CartItem = require("../models/cart-item");

exports.list = (req, res, next) => {
  CartItem.find()
    .populate("product")
    .then((result) => res.json(result))
    .catch((err) => next(err));
};

exports.detail = (req, res, next) => {
  CartItem.findById(req.params.id)
    .populate("product")
    .then((result) => res.json(result))
    .catch((err) => next(err));
};

exports.list_user = (req, res, next) => {
  CartItem.find({ user: req.params.user_id })
    .populate("product")
    .then((result) => res.json(result))
    .catch((err) => next(err));
};

exports.create = (req, res, next) => {
  const { user, product, quantity, image } = req.body;
  const new_cart_item = new CartItem({ user, product, quantity, image });

  new_cart_item
    .save()
    .then((result) => res.json(result))
    .catch((err) => next(err));
};

exports.update = (req, res, next) => {
  const cart_item = ({ user, product, quantity, image } = req.body);

  CartItem.findByIdAndUpdate(req.params.id, cart_item, { new: true })
    .then((result) => res.json(result))
    .catch((err) => next(err));
};
