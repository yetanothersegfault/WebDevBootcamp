//set up express
const express = require("express");
const app = express();

//set up mongoose for Mongodb
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/yelp_camp", {useUnifiedTopology: true, useNewUrlParser: true});

//DBs set up
const Campground = require("./models/campground");
const Comment = require("./models/comment")

//seed file
const seedDB = require("./seeds");
seedDB();

//const request = require("request");

//set up the body parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

//get stylesheets
app.use(express.static(__dirname + "/public"));

//set the view engine
app.set("view engine", "ejs");

//landing page
app.get("/", (req, res) => {
	res.render("landing");
});

//INDEX ROUTE - show all campgrounds
//lists all the campgrounds currently in system
app.get("/campgrounds", (req, res) => {
	//get all campgrounds from db
	Campground.find({}, (err, campgrounds) => {
		if(err)
		{
			//error
			console.log(err);
		}
		else
		{
			//got all the campgrounds from the db
			//pass them to the template to render
			res.render("campgrounds/index", {campgrounds: campgrounds});
		}
	});
});

//NEW ROUTE - shows form
//route to form that adds new campgrounds
app.get("/campgrounds/new", (req, res) => {
	res.render("campgrounds/new");
});

//CREATE ROUTE - add new campground to db
//get a new campground entry
app.post("/campgrounds", (req, res) => {
	//get data from form
	const campName = req.body.campName;
	const url = req.body.imageURL;
	const desc = req.body.campDesc;
	
	//add to campground database
	Campground.create({name: campName, image: url, description: desc}, (err, campground) => {
		if(err){
			console.log(err);
		}
		else {
			console.log("Campground added: ");
			console.log(campground);
			//redirect to camgrounds page
			res.redirect("/campgrounds");
		}
	});	
});

//SHOW ROUTE - show info about one campground
app.get("/campgrounds/:id", (req, res) => {
	//find campground with id
	Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
		if(err){
			console.log(err)
		}
		else{
			//render show template with that campground
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});
});

//=======================
//COMMENT ROUTES

//New Comment Route
app.get("/campgrounds/:id/comments/new", (req, res) => {
	//find campground from db
	Campground.findById(req.params.id, (err, campground) => {
		//check for err
		if(err)
		{
			console.log(err)
		}
		else
		{
			res.render("comments/new", {campground: campground});
		}
	});
});

//Create Comment Route
app.post("/campgrounds/:id/comments", (req, res) => {
	//get campground from db
	Campground.findById(req.params.id, (err, campground) => {
		//check for error
		if(err)
		{
			console.log(err)
			res.redirect("/campgrounds");
		}
		else
		{
			//create new comment
			Comment.create(req.body.comment, (err, comment) => {
				if(err)
				{
					console.log(err);
				}
				else
				{
					//add the comment to the db
					campground.comments.push(comment);
					campground.save();
					//redirect
					res.redirect("/campgrounds/" + req.params.id);
				}
			});

		}
	});
	
});

app.listen(3000, process.env.IP, () => {
	console.log("Server Started");
})