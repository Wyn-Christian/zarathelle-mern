const { Product } = require("../models/product");

exports.list = (req, res, next) => {
  Product.find()
    .populate("collection_id")
    .then((result) => res.json(result))
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

exports.detail = (req, res, next) => {
  Product.findById(req.params.id)
    .populate("collection_id")
    .then((result) => res.json(result))
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

exports.create = (req, res, next) => {
  const { name, description, category, collection_id, stocks } = req.body;

  const new_product = new Product({
    name,
    description,
    image: req.file.filename,
    category,
    collection_id,
    stocks,
  });

  new_product
    .save()
    .then((result) => res.json(result))
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

exports.update = (req, res, next) => {
  const product = ({ name, description, stocks } = req.body);

  if (req.body.collection_id) {
    product.collection_id = req.body.collection_id;
  }
  if (req.body.category) {
    product.category = req.body.category;
  }

  if (req.file) {
    product.image = req.file.filename;
  }
  Product.findByIdAndUpdate(req.params.id, product, { new: true })
    .then((result) => res.json(result))
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

exports.delete = (req, res, next) => {
  Product.findByIdAndDelete(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => {
      console.log(err);
      next(err);
    });
};
