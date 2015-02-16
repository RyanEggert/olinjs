// Routes related to displaying cheeps.
var path = require("path");
var models = require(path.join(__dirname, "../models/models"));
var User = models.User;
var Cheep = models.Cheep;

var cheeprroutes = {};

// Main page
var home = function(req, res) {
  console.dir(req.session.user);
  // find users
  User.find({})
    .sort({
      username: 1
    })
    .exec(function(err, users) {
      if (err) {
        res.status(500).send('Error gathering users');
      } else {
        //find cheeps
        Cheep.find({})
          .sort({
            date: -1
          })
          .exec(function(err, cheeps) {
            if (err) {
              res.status(500).send('Error gathering cheeps');
            } else {
              //find cheeps
              res.render('home', {
                cheeps: cheeps,
                users: users,
                currentuser: req.session.user
              });
            }
          });
      }
    });
};

cheeprroutes.home = home;

// new cheep
var makenewcheep = function(req, res) {
  var in_text = req.body.in_cheep;
  var in_name = req.session.user;
  //make new cheep in db
  var newCheep = new Cheep({
    words: in_text,
    username: in_name
  });
  newCheep.save(function(err, newcheep) {
    if (err) {
      res.status(500).send('Error creating new user');
    } else {
      req.session.user = in_name;
      res.send(newcheep);
    }
  });
};
cheeprroutes.new = makenewcheep;



module.exports = cheeprroutes;
