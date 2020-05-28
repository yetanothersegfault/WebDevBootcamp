const express = require("express"),
	  router = express.Router(),
	  Campground = require("../models/campground"),
	  Comment = require("../models/comment"),
	  middleware = require("../middleware");

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
router.get("/new", middleware.isLoggedIn, (req, res) => {
	res.render("campgrounds/new");
});

//CREATE ROUTE - add new campground to db
//get a new campground entry
router.post("/", middleware.isLoggedIn, (req, res) => {
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
			//redirect to campgrounds page
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

//EDIT ROUTE - edit the campground
router.get("/:id/edit", middleware.checkCampgroundOwnership, (req, res) => {
	Campground.findById(req.params.id, (err, campground) => {
		res.render("campgrounds/edit", {campground: campground});
	});
});

//UPDATE ROUTE - put request to take the info from the edit request
router.put("/:id", middleware.checkCampgroundOwnership, (req, res) => {
	//find and update campground
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCamp) => {
		if(err)
		{
			console.log(err);
			res.redirect("/campgrounds");
		}
		else
		{
			//redirect to campground page
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

//DESTROY ROUTE - removes a campground from the db
router.delete("/:id", middleware.checkCampgroundOwnership, (req, res) => {
	Campground.findByIdAndRemove(req.params.id, (err, campgroundRemoved) => {
		if(err)
		{
			res.redirect("/campgrounds");
		}
		else
		{
			Comment.deleteMany({_id: { $in: campgroundRemoved.comments } }, (err) => {
				if (err) {
					console.log(err);
				}
				res.redirect("/campgrounds");
			});
		}
	});
});

module.exports = router;