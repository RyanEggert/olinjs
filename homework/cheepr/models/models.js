var mongoose = require("mongoose");
var models = {};

// user

var userSchema = mongoose.Schema({
username: String,
});

models.User = mongoose.model("User", userSchema);

// cheep

var cheepSchema = mongoose.Schema({
username: String,
words: String,
date: { type: Date, default: Date.now }
});
models.Cheep = mongoose.model("Cheep", cheepSchema);


module.exports = models;
