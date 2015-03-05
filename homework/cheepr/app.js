//// CHEEPR ////
// "Like twitter, but cheepr." //

// external requirements
var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var session = require('express-session');
var mongoose = require("mongoose");

// internal requirements
var cheeprs = require("./routes/cheepr");
var users = require("./routes/users");
var authrs = require("./routes/auth");

// app creation & configuration
var app = express();

var PORT = process.env.PORT || 3000;
var mongoURI = process.env.MONGOURI || "mongodb://localhost/test";

app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));

// routes
app.get('/', cheeprs.home);

app.get('/login', authrs.login);
app.post('/logout', authrs.logout);

app.post('/users/simpleauth/', users.simplogin);
app.post('/users/new/', users.new);
app.post('/cheep/new/', cheeprs.new);
app.delete('/cheep/delete/', cheeprs.delete);

// connections
mongoose.connect(mongoURI);
app.listen(PORT, function() {
  console.log("Application running on port:", PORT);
});
