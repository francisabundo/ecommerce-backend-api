const express = require("express");
const router = express.Router();

const auth = require('../auth'); //

const productController = require("../controllers/productController");


//Route for creating a product
router.post("/", auth.verify, (req, res) => {

	const userData = auth.decode(req.headers.authorization);

	if(userData.isAdmin){
		productController.addProduct(req.body)
        .then(resultFromController => res.send(resultFromController));
	} else {
		console.log({ auth : "unauthorized user"})
		res.send(false);
	}
});

//Retrieve all products
router.get("/all", auth.verify, (req, res) => {

    const userData= auth.decode(req.headers.authorization)

    if (userData.isAdmin == false) {
        console.log({ auth : "unauthorized user"})
        res.send(false)
    } else {
        productController
        .getAllProducts(req.body)
        .then((resultFromController) => res.send(resultFromController));
    }
});


//Retrieve all active products
router.get("/", (req, res) => {
    productController.getAllActiveProducts()
    .then((resultFromController) => res.send(resultFromController));
})


router.get("/:productId", (req, res) =>{
    console.log(req.params)

    productController
    .getProduct(req.params)
    .then((resultFromController) => res.send(resultFromController));
})

//Update product details
router.put("/:productId", auth.verify, (req, res) =>{

    const isAdmin = auth.decode(req.headers.authorization).isAdmin  


    if (isAdmin) {
        productController
        .updateProduct(req.params, req.body)
        .then((resultFromController) => res.send(resultFromController));
        
    } else {
        console.log({auth: "unauthorized"})
        res.send(false);
    }   
})

//Archive a product
router.patch("/:productId/archive", auth.verify, (req, res) => {

    const userData = auth.decode(req.headers.authorization);

    if (userData && userData.isAdmin) {
      console.log(req.params);

      productController
        .archiveProduct(req.params, req.body)
        .then((resultFromController) => res.send(resultFromController));

    } else {
        console.log({auth: "unauthorized"})
        res.send(false);
    }
});

//Activate a product
router.patch("/:productId/activate", auth.verify, (req, res) => {

    const userData = auth.decode(req.headers.authorization);

    if (userData && userData.isAdmin) {
      console.log(req.params);

      productController
        .activateProduct(req.params, req.body)
        .then((resultFromController) => res.send(resultFromController));

    } else {
        res.send(false);
    }
});












module.exports = router;
