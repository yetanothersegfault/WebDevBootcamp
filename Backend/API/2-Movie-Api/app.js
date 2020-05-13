//set up express
const express = require("express");
const app = express();
const request = require("request");

//set the view engine
app.set("view engine", "ejs");

//set up expres to use the body-parser
//app.use(bodyParser.urlencoded({extended: true}));

//home route
app.get("/", (req, res) => {
	res.render("home");
});

app.get("/results", (req, res) => {
	console.log(req.query.omdbSearch);
	const url = "http://www.omdbapi.com/?s=" + req.query.omdbSearch + "&apikey=thewdb";
	request(url, (error, response, body) => {
		if(!error && response.statusCode ==200)
		{
			const data = JSON.parse(body);
			res.render("results", {data: data});
		}
	});
});

app.listen(3000, process.env.IP, () => {
	console.log("Server Started");
})