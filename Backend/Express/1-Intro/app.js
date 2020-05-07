var express = require("express");
var app = express();

// "/" => "Hi there!"
app.get("/", function(req, res){
		res.send("Hi there!");	
	});
// "/bye" => "Goodbye"
app.get("/bye", function(req, res){
	res.send("Goodbye");
});
// "/dog" => "Meow!"
app.get("/dog", function(req, res){
	console.log("Someone made a request to /dog");
	res.send("Meow!");
});

//this will grab any thing that follows the /r/anything format
//use the colon to make it a pattern in express
app.get("/r/:subredditName", function(req, res){
	//req has every detail about the incoming request
	//including req.params which has the string that was in the pattern field
	console.log(req.params);
	var subName = req.params.subredditName;
	res.send("WELCOME TO THE " + subName.toUpperCase() + " SUBREDDIT!");
});

//catch the rest of the quiries that we don't have a mapping for
app.get("*", function(req, res){
	res.send("Star Page");
});

//Tell express to listen for requests (start the server)
app.listen(3000, process.env.IP);