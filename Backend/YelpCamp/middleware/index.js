//all the middleware goes here
const middlewareObj = {},
	  Campground = require("../models/campground"),
	  Comment = require("../models/comment");

middlewareObj.checkCampgroundOwnership = function checkCampgroundOwnership(req, res, next) {
	//check to see if logged in
	if(req.isAuthenticated())
	{
		Campground.findById(req.params.id, (err, campground) => {
			if(err)
			{
				console.log(err);
				res.redirect("back")
			}
			else
			{
				//is the user logged in the same as the user that created the campground
				if(campground.author.id.equals(req.user._id))
				{
					next();
				}
				else
				{
					console.log("You do not have permission to do that");
					res.redirect("back");
				}
			}
		});
	}
	else
	{
		console.log("You need to be logged in to see that");
		res.redirect("back");
	}
}

middlewareObj.checkCommentOwnership = function checkCommentOwnership(req, res, next) {
	//check to see if logged in
	if(req.isAuthenticated())
	{
		Comment.findById(req.params.comment_id, (err, comment) => {
			if(err)
			{
				console.log(err);
				res.redirect("back")
			}
			else
			{
				//is the user logged in the same as the user that created the campground
				if(comment.author.id.equals(req.user._id))
				{
					next();
				}
				else
				{
					console.log("You do not have permission to do that");
					res.redirect("back");
				}
			}
		});
	}
	else
	{
		console.log("You need to be logged in to see that");
		res.redirect("back");
	}
}

middlewareObj.isLoggedIn = function isLoggedIn(req, res, next){
	if(req.isAuthenticated())
	{
		return next();
	}
	res.redirect("/login");
}
	


module.exports = middlewareObj;