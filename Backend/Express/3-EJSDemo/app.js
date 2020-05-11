var express = require("express");
var app = express();

app.get("/", function(req, res){
	res.render("home.ejs");
});

app.get("/fallinlove/:thing", function(req, res){
	var thing = req.params.thing;
	res.render("love.ejs", {thingVar: thing});
});

//Tell express to listen for requests (start the server)
app.listen(3000, process.env.IP);