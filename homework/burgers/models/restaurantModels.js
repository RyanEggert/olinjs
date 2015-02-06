var mongoose = require("mongoose");
var models = {};


// inventory

var ingredientSchema = mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number
});
models.ingredient = mongoose.model("Ingredient", ingredientSchema);

// orders

var orderSchema = mongoose.Schema({
    toppings: [String], // We check to make sure the ingredient name is in our database in decrinvent() in index.js. No need to use [ingredientSchema] here.
    date: {
        type: Date,
        default: Date.now
    }
});
models.order = mongoose.model("Order", orderSchema);


module.exports = models;
