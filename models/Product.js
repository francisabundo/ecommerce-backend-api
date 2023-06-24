const mongoose = require("mongoose");
const shortid = require("shortid");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: false, unique: true, default: shortid.generate },
    category: { type: String, required: true },
    image: { type: String, required: false },
    images: [String],
    price: { type: Number, required: true },
    brand: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    description: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);




 

