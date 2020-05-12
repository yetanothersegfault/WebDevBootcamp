//set up express
var express = require("express");
var app = express();
var bodyParser = require("body-parser");

//set up expres to use the body-parser
app.use(bodyParser.urlencoded({extended: true}));

//set view engine to ejs
app.set("view engine", "ejs");

var friends = ["Tony", "Miranda", "Justin", "Pierre", "Lily"];

app.get("/", function(req, res){
	res.render("home");
});

app.get("/friends", function(req, res){
	res.render("friends", {friends: friends});
});

app.post("/addFriend", function(req, res){
	var newFriend = req.body.newFriend;
	friends.push(newFriend);
	res.redirect("/friends")
});

//Tell express to listen for requests (start the server)
app.listen(3000, process.env.IP, function(){
	console.log("Server Started...");
});