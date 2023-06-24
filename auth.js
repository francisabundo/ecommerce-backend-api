const jwt = require("jsonwebtoken");
// User defined string data that will be used to create our JSON web tokens
// Used in the algorithm for encrypting our data which makes it difficult to decode the information without the defined secret keyword
const secret = "ecommerceAPI";

// [ S E C T I O N ] JSON Web Tokens
/*
    - JSON Web Token or JWT is a way of securely passing information from the server to the frontend or to other parts of server
    - Information is kept secure through the use of the secret code
    - Only the system that knows the secret code that can decode the encrypted information

    - Imagine JWT as a gift wrapping service that secures the gift with a lock
    - Only the person who knows the secret code can open the lock
    - And if the wrapper has been tampered with, JWT also recognizes this and disregards the gift
    - This ensures that the data is secure from the sender to the receiver
*/

// Token creation
/*
    - Analogy
        Pack the gift and provide a lock with the secret code as the key
*/

module.exports.createAccessToken = (user) => {
  // The data will be received from the registration form
  // When the user logs in, a token will be created with user's information
    const data = {
            id: user._id,
            email: user.email,
            isAdmin: user.isAdmin,
    };
    
  return jwt.sign(data, secret, {});
};


module.exports.verify = (req, res, next) => {

// The token is retrieved from the request header
// This can be provided in postman under
// Authorization > Bearer Token
  let token = req.headers.authorization

  // Token received and is not undefined
  if(typeof token !== 'undefined'){
    console.log(token);

    // Token received and is not undefined
    // The "slice" method takes only the token from the information sent via the request header
		// The token sent is a type of "Bearer" token which when recieved contains the word "Bearer " as a prefix to the string
		// This removes the "Bear
    token = token.slice(7, token.length);

    // Validate the token using the "verify" method decrypting the token using the secret code
    return jwt.verify(token, secret, (err, data) =>{
      console.log(data);

        if(err){

          return res.send({auth: "failed"});

          // If JWT is valid
        } else {

            // Allows the application to proceed with the next middleware function/callback function in the route
						// The verify method will be used as a middleware in the route to verify the token before proceeding to the function that invokes the controller function
            next();
        }
    })

  // Token does not exist
  } else {

    return res.send({auth: "failed"});

  }
};


module.exports.decode = token =>{

  // Token recieved and is not undefined
  if (typeof token !== "undefined"){

    // Retrieves only the token and removes the "Bearer " prefix
    token = token.slice(7, token.length)

    return jwt.verify(token, secret, (err, data) => {
      console.log(data);
      if (err) {
        return null;
      } else {
        // The "decode" method is used to obtain the information from the JWT
						// The "{complete:true}" option allows us to return additional information from the JWT token
						// Returns an object with access to the "payload" property which contains user information stored when the token was generated
						// The payload contains information provided in the "createAccessToken" method defined above (e.g. id, email and isAdmin)
            return jwt.decode(token, {complete: true}).payload;
        
      }
    }) 

    //Token does not exist
  } else {
      return null;
  }


};

