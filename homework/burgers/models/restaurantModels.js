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
    customername: String,
    toppings: [ingredientSchema],
    date: {
        type: Date,
        default: Date.now
    }
});
models.order = mongoose.model("Order", orderSchema);


module.exports = models;
