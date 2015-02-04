var home = function(req, res){
  res.render("home");
};

var ingredients = function(req, res){
  var sampleings = [{'name':'Tomato Sauce', 'quantity':20, 'price':4.99}, {'name':'Meatballs', 'quantity':14, 'price':2.99}]
  res.render("inventory", {'ingredient': sampleings, 'ptitle':'Inventory List'} );
};

var order = function(req, res){
  var sampleings = [{'name':'Tomato Sauce', 'quantity':20, 'price':4.99}, {'name':'Meatballs', 'quantity':14, 'price':2.99}]
  res.render("order", {'ingredient':sampleings, 'ptitle':'Order a burger'});
};

var kitchen = function(req, res){
  res.render("kitchen");
};

module.exports.home = home;
module.exports.placeorder = order;
module.exports.inventory = ingredients;
