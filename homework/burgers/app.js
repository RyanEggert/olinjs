// external requirements
var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");

// internal requirements
var index = require("./routes/index");

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

// routes
app.get("/", index.home);
app.get("/ingredients", index.inventory);
app.get("/order", index.placeorder);
app.get("/kitchen", index.vieworders);

app.post("/newItem", index.additemPOST);
app.post("/updateItem", index.updateitemPOST);
app.post("/placeOrder", index.placeorderPOST);   // updates inventory based on order
app.post("/placeOrder", index.placeorderPOST2);  // places order in database
app.post("/completedOrder", index.completedorderPOST);  // places order in database



// connections
mongoose.connect(mongoURI);
app.listen(PORT, function() {
    console.log("Application running on port:", PORT);
});
