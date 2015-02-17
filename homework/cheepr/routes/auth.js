// Routes related to signing in and signing out.
var authroutes = {};

var login = function(req, res) {
  res.render('login', {
    currentuser: req.session.user
  });
};

authroutes.login = login;

var logout = function(req, res) {
  req.session.user = "";
  res.send(200);
};

authroutes.logout = logout;

module.exports = authroutes;
