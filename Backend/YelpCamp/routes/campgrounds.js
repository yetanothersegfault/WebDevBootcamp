const express = require("express"),
	  router = express.Router(),
	  Campground = require("../models/campground")

//INDEX ROUTE - show all campgrounds
//lists all the campgrounds currently in system
router.get("/", (req, res) => {
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
router.get("/new", isLoggedIn, (req, res) => {
	res.render("campgrounds/new");
});

//CREATE ROUTE - add new campground to db
//get a new campground entry
router.post("/", isLoggedIn, (req, res) => {
	//get data from form
	const campName = req.body.campName,
		  url = req.body.imageURL,
		  desc = req.body.campDesc,
		  author = {
			  id: req.user._id,
			  username: req.user.username
		  };
	
	//add to campground database
	Campground.create({name: campName, image: url, description: desc, author: author}, (err, campground) => {
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
router.get("/:id", (req, res) => {
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

//check to see if the user is logged in
function isLoggedIn(req, res, next){
	if(req.isAuthenticated())
	{
		return next();
	}
	res.redirect("/login");
}

module.exports = router;