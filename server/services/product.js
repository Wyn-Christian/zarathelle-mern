const { Product } = require("../models/product");

exports.list = (req, res, next) => {
  Product.find()
    .populate("collection")
    .then((result) => res.json(result))
    .catch((err) => next(err));
};

exports.detail = (req, res, next) => {
  Product.findById(req.params.id)
    .populate("collection")
    .then((result) => res.json(result))
    .catch((err) => next(err));
};

exports.create = (req, res, next) => {
  const { name, description, image, category, collection } = req.body;

  const new_product = new Product({
    name,
    description,
    image,
    category,
    collection,
    stocks,
  });

  new_product
    .save()
    .then((result) => res.json(result))
    .catch((err) => next(err));
};

exports.update = (req, res, next) => {
  const product = ({ name, description, image, category, collection, stocks } =
    req.body);

  Product.findByIdAndUpdate(req.params.id, product, { new: true })
    .then((result) => res.json(result))
    .catch((err) => next(err));
};

exports.delete = (req, res, next) => {
  Product.findByIdAndDelete(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => next(err));
};
