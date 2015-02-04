var path = require("path");
var models = require(path.join(__dirname,"../models/restaurantModels"));
var Ingredient = models.ingredient;
var Order = models.order;


var home = function(req, res){
  res.render("home");
};

var ingredients = function(req, res) {
    Ingredient.find()
      .sort({price: -1})
      .exec(function(err, ingredients) {
        if (err) {res.status(500).send("Something broke!")} else{res.render("inventory", {'ingredient': ingredients, 'ptitle':'Inventory List'})};
      })
};


var order = function(req, res){
    Ingredient.find()
          .sort({price: -1})
          .exec(function(err, ingredients) {
            if (err) {res.status(500).send("Something broke!")} else{res.render("order", {'ingredient': ingredients})};
          })
};

var kitchen = function(req, res){
  res.render("kitchen");
};

var additem = function(req, res){
  var newitem = req.body;
  console.log(newitem);
  var newIngredient = new Ingredient(newitem);
  newIngredient.save(function(err) {
    if (err) {res.status(500).send('Something broke!');} else{res.send(newitem)};
  })
};




module.exports.home = home;
module.exports.placeorder = order;
module.exports.inventory = ingredients;
module.exports.vieworders = kitchen;
module.exports.additemPOST = additem;
