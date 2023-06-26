const auth = require('../auth');

const Product = require("../models/Product");
const User = require("../models/User.js");

module.exports.addProduct = reqBody => {
    
    return Product.findOne({ name: reqBody.name })
      .then(existingProduct => {
        if (existingProduct) {
          // If a product with the same name already exists, throw an error
          throw new Error('Product with the same name already exists.');
        } else {
          // Create a new product
          let newProduct = new Product({
            name: reqBody.name,
            slug: reqBody.slug,
            category: reqBody.category,
            image: reqBody.image,
            price: reqBody.price,
            brand: reqBody.brand,
            isActive: reqBody.isActive,
            description: reqBody.description,
          });
  
          return newProduct.save().then(product => true);
        }
      })
      .catch(error => {
        console.log(error);
  
        // Check the error message and inform the frontend about the specific error
        if (error.message === 'Product with the same name already exists.') {
          return 'duplicate_name';
        } else {
          return false;
        }
      });
  };
  
//Retrieve all products
module.exports.getAllProducts = () => {

    return Product.find({}).then(result => result).catch(err => {
        console.log(err)
        return false
    });
}

//Retrieve all active products
module.exports.getAllActiveProducts = () => {

    return Product.find({isActive : true}).then(result => result).catch(err => {
        console.log(err)
        return false
    });
}

//Get specific product
module.exports.getProduct = (reqParams) => {
    return Product.findById(reqParams.productId)
    .then(result => result).catch(err => {
        console.log(err)
        return false
    });
};

//Update product details
module.exports.updateProduct = (reqParams, reqBody) => {
  let updatedProduct = {
    name: reqBody.name,
    description: reqBody.description,
    price: reqBody.price,
    category: reqBody.category,
  };

  return Product.findOne({ name: reqBody.name })
    .then(existingProduct => {
      if (existingProduct && existingProduct._id.toString() !== reqParams.productId) {
        // If a product with the same name exists (excluding the current product being updated), throw an error
        throw new Error('Product with the same name already exists.');
      } else {
        return Product.findByIdAndUpdate(reqParams.productId, updatedProduct)
          .then(product => true)
          .catch(error => {
            console.log(error);
            return false;
          });
      }
    })
    .catch(error => {
      console.log(error);
      // Check the error message and inform the frontend about the specific error
      if (error.message === 'Product with the same name already exists.') {
        return 'duplicate_name';
      } else {
        return false;
      }
    });
};

//Archive a product
module.exports.archiveProduct = (reqParams, reqBody) => {

    return Product.findByIdAndUpdate(reqParams.productId, reqBody)
    .then(result => true)
        .catch((err) => {
            console.log(err);
            return false;
        });
};

//Activate a product
module.exports.activateProduct = (reqParams, reqBody) => {

    return Product.findByIdAndUpdate(reqParams.productId, reqBody)
    .then(result => true)
        .catch((err) => {
            console.log(err);
            return false;
        });
};

