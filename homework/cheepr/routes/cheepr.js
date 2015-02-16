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

// new cheep @ /cheep/new/
var makenewcheep = function(req, res) {
  var in_text = req.body.words;
  var in_name = req.session.user;
  //make new cheep in db
  var newCheep = new Cheep({
    words: in_text,
    username: in_name
  });
  newCheep.save(function(err, newcheep) {
    if (err) {
      res.status(500).send('Error creating new cheep');
    } else {
      res.render('cheep', {'layout':false, 'newcheep':newcheep});
    }
  });
};
cheeprroutes.new = makenewcheep;

// delete cheep @ /cheep/delete/
var deletecheep  = function(req, res) {
  Cheep.findOneAndRemove({
    _id: req.body.orderid
  }, function(err, data) {
    if (err) {
      res.status(500).send("Error removing cheep");
    } else {
      res.send(data);
    }
  });
};
cheeprroutes.delete = deletecheep;

module.exports = cheeprroutes;