const express = require("express");
const router = express.Router();
const auth = require("../auth");
const orderController = require("../controllers/orderController");


// User order checkout
router.post("/checkout", auth.verify, (req, res) => { 

	const userData = auth.decode(req.headers.authorization);

	if(userData.isAdmin) {
		console.log({ auth : "unauthorized user" });

		res.send(false);
	} else {

		let data = 
            {
                userId : userData.id,
                productId : req.body.productId,
                quantity : req.body.quantity
            }
        
		orderController.createOrder(data)
        .then(resultFromController => res.send(resultFromController));
	}
})


//Stretch Goals

//Retrieve authenticated user’s orders
router.get("/completed", auth.verify, (req, res) => { 

	const userData = auth.decode(req.headers.authorization);

	if(userData.isAdmin) {

		console.log({ auth : "unauthorized user" });
		res.send(false);
	} else {

		orderController.getUserOrders({ userId : userData.id })
        .then(resultFromController => res.send(resultFromController));
	}
})

//Get All Orders
router.get("/all", auth.verify, (req, res) => { 

	const userData = auth.decode(req.headers.authorization);

	if(userData.isAdmin) {

        orderController.getAllOrders({})
        .then(resultFromController => res.send(resultFromController));
	} else {

        console.log({ auth : "unauthorized user" });
		res.send(false); 
	}
})

module.exports = router;