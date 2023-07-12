const Order = require("../models/order");
const OrderItem = require("../models/order-item");
const CartItem = require("../models/cart-item");
const { Product } = require("../models/product");

exports.list = (req, res, next) => {
	Order.find()
		.sort({ createdAt: -1 })
		.populate("items user")
		.then((result) => res.json(result))
		.catch((err) => {
			console.log(err);
			next(err);
		});
};

exports.detail = (req, res, next) => {
	Order.findById(req.params.id)
		.populate({ path: "items", populate: "product" })
		.populate("user")
		.then((result) => res.json(result))
		.catch((err) => {
			console.log(err);
			next(err);
		});
};

exports.list_user = (req, res, next) => {
	Order.find({ user: req.params.user_id })
		.sort({ createdAt: -1 })
		.populate({ path: "items", populate: "product" })
		.then((result) => res.json(result))
		.catch((err) => {
			console.log(err);
			next(err);
		});
};

exports.checkout = (req, res, next) => {
	const new_order = new Order({
		user: req.body.user,
		items: req.body.items,
		total_quantity: req.body.total_quantity,
		total_price: req.body.total_price,
	});

	new_order
		.save()
		.then(async (result) => {
			let order_items_result = await OrderItem.insertMany(req.body.items);
			console.log(
				`${order_items_result.length} checkout items documents were inserted`
			);
			let cart_delete_result = await CartItem.deleteMany({
				user: req.body.user,
			});
			console.log(`Deleted ${cart_delete_result.deletedCount} documents`);
			res.json(result);
		})
		.catch((err) => {
			console.log(err);
			next(err);
		});
};

exports.status_change = (req, res, next) => {
	Order.findByIdAndUpdate(
		req.params.id,
		{ status: req.body.status },
		{ new: true }
	)
		.populate("items")
		.then((result) => {
			if (req.body.status === "delivered") {
				// update the stocks and num_sold of the product
				result.items.forEach((item) => {
					Product.findByIdAndUpdate(
						item.product,
						{
							$inc: {
								num_sold: item.quantity,
								stocks: -item.quantity,
							},
						},
						{ new: true }
					).then((result) =>
						console.log(
							`Product ${result.name} stock and num_sold updated`
						)
					);
				});
			}
			res.json(result);
		})
		.catch((err) => {
			console.log(err);
			next(err);
		});
};
