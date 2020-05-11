var express = require("express");
var app = express();

//set up list of animal objects
var animals = {
	cat: {
		sound: "Meow"
	},
	
	dog: {
		sound: "Woof Woof!"
	},
	
	pig: {
		sound: "Oink"
	},
	
	cow: {
		sound: "Moo"
	},
	
	sheep: {
		sound: "Baa"
	}
}

//home page
app.get("/", function(req, res){
	res.send("Hi there, welcome to my assignment!");
});

//speaking animals
app.get("/speak/:animal", function(req, res){
	var animal = req.params.animal;
	console.log(animal);
	if(animals[animal])
	{
		res.send("The " + animal + " says '" + animals[animal].sound + "'");
	}
	else
	{
		pageNotFound(res);
	}
});

app.get("/repeat/:str/:num", function(req, res){
	var str = req.params.str;
	var num = req.params.num;
	num = Number(num);
	var output = "";
	if(num)
	{
		for(var i = 0; i < num; i++)
		{
			output = output.concat(str); 
			output = output.concat(" ");
		}
		res.send(output);
	}
	else
	{
		pageNotFound(res);
	}
});

app.get("*", function(req, res){
	pageNotFound(res);
});

function pageNotFound(res)
{
	res.send("Sorry, page not found...What are you doing with your life?");
}

//Tell express to listen for requests (start the server)
app.listen(3000, process.env.IP);