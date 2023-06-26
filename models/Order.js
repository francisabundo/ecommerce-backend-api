const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  //first layer to be accessed easily
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "User Id is required"],
      },
    
    orderItems: [
        
        {
          slug: { type: String, required: false },
          name: { type: String, required: false },
          quantity: { type: Number, required: true },
          image: { type: String, required: false },
          price: { type: Number, required: true },
          subTotal: { type: Number, required: true },
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: false,
          },
        },
      ],

    }

);

module.exports = mongoose.model("Order", orderSchema);




