const Collection = require("../models/collection");
const { Product } = require("../models/product");

exports.list = (req, res, next) => {
  Collection.find()
    .then((result) => res.json(result))
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

exports.detail = (req, res, next) => {
  Collection.findById(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

exports.list_product_by_collection = (req, res, next) => {
  Product.find({ collection_id: req.params.id })
    .then((result) => res.json(result))
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

exports.create = (req, res, next) => {
  const { title, description, image, category } = req.body;

  const new_collection = new Collection({
    title,
    description,
    image: req.file.filename,
    category,
  });

  new_collection
    .save()
    .then((result) => res.json(result))
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

exports.update = (req, res, next) => {
  const { title, description } = req.body;

  const collection = {
    title,
    description,
  };

  if (req.body.category) {
    collection.category = req.body.category;
  }
  if (req.file) {
    collection.image = req.file.filename;
  }

  Collection.findByIdAndUpdate(req.params.id, collection, { new: true })
    .then((result) => res.json(result))
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

exports.delete = (req, res, next) => {
  Collection.findByIdAndDelete(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => {
      console.log(err);
      next(err);
    });
};
