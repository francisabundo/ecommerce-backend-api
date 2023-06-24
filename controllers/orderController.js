const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");

module.exports.createOrder = async (data) => {
	let product;
	let isUserExists = await User.findById(data.userId)
	  .then((result) => {
		if (result == null) {
		  return false;
		} else {
		  return true;
		}
	  })
	  .catch((err) => {
		console.log(err);
		return false;
	  });
  
	let isProductExists = await Product.findById(data.productId)
	  .then((result) => {
		if (result == null) {
		  return false;
		} else {
		  product = result;
		  return true;
		}
	  })
	  .catch((err) => {
		console.log(err);
		return false;
	  });
  
	if (isUserExists && isProductExists) {


		const orderItem = {
		product: data.productId,
		quantity: data.quantity,
		name: product.name,
		price: product.price,
		subTotal: product.price * data.quantity,
	  };
  
	  const newOrder = new Order({
		userId: data.userId,
		orderItems: [orderItem],
	  });


	  console.log(newOrder);
	//   console.log(data.userId);
  
	  return newOrder
		.save()
		.then((order) => {
		  return true 
		})
		.catch((err) => {
		  console.log(err);
		  return false;
		});
		
	} else {
	  console.log("Invalid user and/or product");
	  return false;
	}
  };
  


//Stretch Goals

// Retrieve authenticated user’s orders
module.exports.getUserOrders = async (data) => {
	try {
	  const orders = await Order.find({ userId: data.userId });
	  return orders;
	} catch (error) {
	  console.log(error);
	  return false;
	}
  };
  



//Get All Orders
module.exports.getAllOrders = data => {
	return Order.find({}).then(result => {

		return result
	}).catch(err => {
		console.log(err);

		return false;
	});
}


