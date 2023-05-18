const User = require("../models/user");

exports.list = (req, res, next) => {
  User.find()
    .then((result) => res.json(result))
    .catch((err) => next(err));
};

exports.detail = (req, res, next) => {
  User.findById(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => next(err));
};

exports.login = async (req, res, next) => {
  let user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (user === null) {
    return res.json({ error: "wrong input email or password!" });
  }

  return res.json(user);
};

exports.signup = (req, res, next) => {
  const {
    username,
    first_name,
    last_name,
    address,
    phone,
    email,
    image,
    password,
  } = req.body;

  const new_user = new User({
    username,
    first_name,
    last_name,
    address,
    phone,
    email,
    image,
    password,
  });

  new_user
    .save()
    .then((result) => res.json(result))
    .catch((err) => next(err));
};

exports.update = (req, res, next) => {
  const user = ({
    username,
    first_name,
    last_name,
    address,
    phone,
    email,
    password,
  } = req.body);

  User.findByIdAndUpdate(req.params.id, user, { new: true })
    .then((result) => res.json(result))
    .catch((err) => next(err));
};

exports.delete = (req, res, next) => {
  User.findByIdAndDelete(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => next(err));
};
