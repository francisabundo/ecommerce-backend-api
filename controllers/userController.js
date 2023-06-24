const bcrypt = require('bcrypt');
const auth = require('../auth');

const User = require('../models/User');
const Course = require('../models/Product');
const Order = require('../models/Order');


module.exports.checkEmailExists = (reqBody) => {

	return User.find({ email : reqBody.email }).then(result => {

		if(result.length > 0){

			return true;
		} else {

			return false;
		}
	}).catch(err => {

				console.log(err);

				return false;
		});
};

//Register users
module.exports.registerUser = (reqBody) => {
    return User.find({email: reqBody.email}).then(result => {
    console.log(result.length)

        if (result.length > 0) {
            return "Email already exists";
        } 
        else {

            let newUser = new User({
                firstName: reqBody.firstName,
                lastName: reqBody.lastName,
                email: reqBody.email,
                password: bcrypt.hashSync(reqBody.password, 10)
            })
        
            return newUser.save()
            .then(user => true)
            .catch(err => {
                console.log(err);
            });
        }
    })
}

//Login users
module.exports.loginUser = (reqBody) => {
    return User.findOne({email: reqBody.email}).then(result => {
        
        if (result == null) {
            console.log("User not registered");
            return false;
    
        }else {
            const isPasswordCorrect = bcrypt.compareSync(reqBody.password, result.password)

            if (isPasswordCorrect) {
                return {access: auth.createAccessToken(result)}
            }else {
                console.log("Password did not match");
                return false; 
            }
        }
    })   
}

//Get user details
module.exports.getProfile = (data) => {

    return User.findById(data.userId).then((result) => {

        if (!result) {
            return false;
        } else {
            result.password = "";
            return result;
        }
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  };

  //Get All Users
module.exports.getAllUsers = data => {
	return User.find({}).then(result => {

		return result
	}).catch(err => {
		console.log(err);

		return false;
	});
}

 //Stretch Goals
  
  //Set user as admin
  module.exports.setUserAdmin = (reqBody) => {
    return User.findOne({ email: reqBody.email }).then((user) => {

        if (user) {
            
            user.isAdmin = true;
            return user.save().then(user => true)
            .catch((err) => {
                console.log(err);
                return false;
              });
  

        } else {
          console.log("Email not registered");
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
        return false;
      });


      


};

