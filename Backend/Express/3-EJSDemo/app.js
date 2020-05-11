var express = require("express");
var app = express();

//get stylesheets
app.use(express.static("public"));

//this is just a shortcut of sorts
//tell express that we will always give .ejs files
app.set("view engine", "ejs");
//now in any route we don't need to declare them as .ejs

app.get("/", function(req, res){
	res.render("home");
});

app.get("/fallinlove/:thing", function(req, res){
	var thing = req.params.thing;
	res.render("love", {thingVar: thing});
});

app.get("/posts", function(req, res){
	var posts = [
		{title: "Post 1", author: "Susy"},
		{title: "My Adorable Pet Bunny", author: "Charlie"},
		{title: "Can you believe this Pomsky?", author: "Colt"}
	];
	
	res.render("posts", {posts: posts});
});

//Tell express to listen for requests (start the server)
app.listen(3000, process.env.IP);