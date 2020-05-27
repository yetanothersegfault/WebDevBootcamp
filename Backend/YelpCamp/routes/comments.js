const express = require("express"),
	  router = express.Router({mergeParams: true}),
	  Campground = require("../models/campground"),
	  Comment = require("../models/comment")

//=======================
//COMMENT ROUTES

//New Comment Route
router.get("/new", isLoggedIn, (req, res) => {
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
router.post("/", isLoggedIn, (req, res) => {
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
					//add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					//save comment
					comment.save();
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

//check to see if the user is logged in
function isLoggedIn(req, res, next){
	if(req.isAuthenticated())
	{
		return next();
	}
	res.redirect("/login");
}

module.exports = router;