var path = require("path");
var models = require(path.join(__dirname, "../models/restaurantModels"));
var Ingredient = models.ingredient;
var Order = models.order;

var home = function(req, res) {
  res.render("home");
};

var ingredients = function(req, res) {
  Ingredient.find()
    .sort({
      price: -1
    })
    .exec(function(err, ingredients) {
      if (err) {
        res.status(500).send("Something broke!");
      } else {
        res.render("inventory", {
          'ingredient': ingredients
        });
      }
    });
};

var order = function(req, res) {
  Ingredient.find({
      'quantity': {
        $gte: 0
      }
    })
    .sort({
      price: -1
    })
    .exec(function(err, ingredients) {
      if (err) {
        res.status(500).send("Something broke!");
      } else {

        res.render("order", {
          'ingredient': ingredients
        });
      }
    });
};

var kitchen = function(req, res) {
  Order.find({})
    .sort({
      date: -1
    })
    .exec(function(err, orders) {
      if (err) {
        res.status(500).send("Something broke!");
      } else {
        res.render("kitchen", {
          'order': orders
        });
      }
    });
};

var additem = function(req, res) {
  var newitem = req.body;
  var newIngredient = new Ingredient(newitem);
  newIngredient.save(function(err, newingred) {
    if (err) {
      res.status(500).send('Something broke!');
    } else {
      newitem.id = newingred._id;
      res.send(newitem);
    }
  });
};

var updateitem = function(req, res) {
  // updates either item name, quanity, or price
  var updateinfo = req.body;
  // I wish dynamic attributes names were possible.
  // Is there a better way to do this? (no if/elif/else)`
  if (updateinfo.tochange === 'name') {
    Ingredient.findOneAndUpdate({
        '_id': updateinfo.item
      }, {
        name: updateinfo.newval
      },
      function(err, data) {
        if (err) {
          res.status(500).send("Something broke!");
        } else {
          res.send(updateinfo);
        }
      });
  } else if (updateinfo.tochange === 'quantity') {
    Ingredient.findOneAndUpdate({
        '_id': updateinfo.item
      }, {
        quantity: updateinfo.newval
      },
      function(err, data) {
        if (err) {
          res.status(500).send("Something broke!");
        } else {
          res.send(updateinfo);
        }
      });

  } else {
    Ingredient.findOneAndUpdate({
        '_id': updateinfo.item
      }, {
        price: updateinfo.newval
      },
      function(err, data) {
        if (err) {
          res.status(500).send("Something broke!");
        } else {
          res.send(updateinfo);
        }
      });

  }

};

var decrinvent = function(req, res, next) {
  var indata = req.body;
  var orderinfo = indata.items.split(/\&|\=/);
  var names = [];
  for (var i = orderinfo.length - 2; i >= 0; i -= 2) {
    names.push(orderinfo[i]);
  }
  // Update inventory
  Ingredient.update({
    'name': {
      $in: names // for each ordered item, ...
    }
  }, {
    '$inc': {
      'quantity': -1 // decrement its quantity
    }
  }, {
    'multi': true // yes, decrement each ordered item
  }, function(err, ingredients) {
    if (err) {
      res.status(500).send("Error saving ingredients");
      console.log(err);
    } else {
      next(); // Success! Now go add order to db
    }
  });
};

var placeorder = function(req, res) {
  var indata = req.body;
  var orderinfo = indata.items.split(/\&|\=/);
  var names = [];
  for (var i = orderinfo.length - 2; i >= 0; i -= 2) {
    names.push(orderinfo[i]);
  }
  // Update inventory
  neworder = {
    'toppings': names
  };
  var newOrder = new Order(neworder);
  newOrder.save(function(err, neword) {
      if (err) {
        res.status(500).send('Error saving order.');
      } else {
        res.send(neword);
      }
    }

  );
};

var deletecompletedorder = function(req, res) {
  var orderinfo = req.body;
  Order.findOneAndRemove({
      '_id': orderinfo.orderid
    },
    function(err, data) {
      if (err) {
        res.status(500).send("Something broke!");
      } else {
        res.send(orderinfo);
      }
    });

};

var routes = {
  home: home,
  placeorder: order,
  inventory: ingredients,
  vieworders: kitchen,
  additemPOST: additem,
  updateitemPOST: updateitem,
  placeorderPOST: decrinvent,
  placeorderPOST2: placeorder,
  completedorderPOST: deletecompletedorder
};

module.exports = routes;
