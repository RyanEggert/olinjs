// Routes relating to users & authentication
var path = require("path");
var models = require(path.join(__dirname, "../models/models"));
var User = models.User;


var userroutes = {};
// new user
var newuser = function(req, res) {
  res.render("home");
};
userroutes.new = newuser;

// login page
var login = function(req, res) {
  res.render("login");
};
userroutes.login = newuser;


// login handler @ /users/simpleauth
var sloginhandler = function(req, res) {
  var in_name = req.body.username;
  User.find({
      username: in_name
    })
    .count(1)
    .exec(function(err, user) {
      if (user === 0) {
        //make new user
        var newUser = new User({
          username: in_name
        });
        newUser.save(function(err, newuser) {
          if (err) {
            res.status(500).send('Error creating new user');
          } else {
            req.session.user = in_name;
            res.redirect('/');
          }
        });
      } else {
        // user exists
        // set cookie
        req.session.user = in_name;
        res.redirect('/');
      }
    });
};
userroutes.simplogin = sloginhandler;
// logout



module.exports = userroutes;
