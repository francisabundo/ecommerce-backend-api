const express = require('express');
const router = express.Router();

const auth = require('../auth');

const userController = require('../controllers/userController');  


router.post("/checkEmail", (req, res) => {
	userController.checkEmailExists(req.body).then(resultFromController => res.send(resultFromController));
});

//Route for registering users
router.post("/register", (req, res) => {
    userController.registerUser(req.body).then(resultFromController => res.send(resultFromController)); 
});

//Route for registering users
router.post("/register", (req, res) => {
    userController.registerUser(req.body).then(resultFromController => res.send(resultFromController)); 
});

//Route for signing in users
router.post("/login", (req, res) => {
    userController.loginUser(req.body)
    .then(resultFromController => res.send(resultFromController));    
})

//Route for retrieving user details
router.post("/details", auth.verify, (req, res) => {

    const userData = auth.decode(req.headers.authorization)

    userController.getProfile({userId : userData.id})
    .then((resultFromController) => res.send(resultFromController));
  });

//Get All Users
router.get("/all", auth.verify, (req, res) => { 

	const userData = auth.decode(req.headers.authorization);

	if(userData.isAdmin) {

        userController.getAllUsers({})
        .then(resultFromController => res.send(resultFromController));
	} else {

        console.log({ auth : "unauthorized user" });
		res.send(false); 
	}
})


router.patch("/setAdmin", auth.verify, (req, res) => {
    const userData = auth.decode(req.headers.authorization);

    if(userData.isAdmin){

        userController.setUserAdmin(req.body).then(resultFromController => res.send(resultFromController));
    }else{
        console.log({ auth : "unauthorized user" });
        res.send(false);
    };

});
  
module.exports = router;

