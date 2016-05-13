var mongoose = require("mongoose");
var Schema   = mongoose.Schema;

var ProductSchema = new Schema({
  name: { type: String, trim: true, required: true },
  description: { type: String },
  price: { type: Number, required: true }
});

var Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
