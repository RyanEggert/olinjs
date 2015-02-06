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
    var updateinfo = req.body;
    console.log(updateinfo);
    if (updateinfo.tochange === 'quantity') {
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
    console.log(orderinfo);
    var names = [];
    for (var i = orderinfo.length - 2; i >= 0; i -= 2) {
        names.push(orderinfo[i]);
    }
    console.log(names);
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
    console.log(orderinfo);
    var names = [];
    for (var i = orderinfo.length - 2; i >= 0; i -= 2) {
        names.push(orderinfo[i]);
    }
    console.log(names);
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


module.exports.home = home;
module.exports.placeorder = order;
module.exports.inventory = ingredients;
module.exports.vieworders = kitchen;
module.exports.additemPOST = additem;
module.exports.updateitemPOST = updateitem;
module.exports.placeorderPOST = decrinvent;
module.exports.placeorderPOST2 = placeorder;
