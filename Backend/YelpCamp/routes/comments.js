const express = require("express"),
	  router = express.Router({mergeParams: true}),
	  Campground = require("../models/campground"),
	  Comment = require("../models/comment"),
	  middleware = require("../middleware");

//=======================
//COMMENT ROUTES

//New Comment Route
router.get("/new", middleware.isLoggedIn, (req, res) => {
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
router.post("/", middleware.isLoggedIn, (req, res) => {
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

//EDIT ROUTE - edits a comment
router.get("/:comment_id/edit", middleware.checkCommentOwnership, (req, res) => {
	//get the campground
	Campground.findById(req.params.id, (err, campground) => {
		if(err)
		{
			console.log(err);
			res.redirect("/campgrounds");
		}
		else
		{
			//get the comment from db
			Comment.findById(req.params.comment_id, (err, comment) => {
				if(err)
				{
					console.log(err);
					res.redirect("/campgrounds/" + req.params.id);
				}
				else
				{
					//show the edit page
					res.render("comments/edit", {comment: comment, campground: campground});
				}
			});
		}
	});
})

//UPDATE ROUTE - put request to take the info from the edit request
router.put("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
	//find and update campground
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
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

//DESTROY ROUTE - removes a comment from the db
router.delete("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
	Comment.findByIdAndRemove(req.params.comment_id, (err) => {
		if(err)
		{
			console.log(err);
			res.redirect("/campgrounds/" + req.params.id);
		}
		else
		{
			//go into which campground it is and delete the reference to the comment
			Campground.findById(req.params.id, (err, campground) => {
				campground.comments.remove(req.params.comment_id);
				campground.save((err) => {
					if(err)
					{
						console.log(err);
						res.redirect("/campgrounds/" + req.params.id);
					}
					else
					{
						res.redirect("/campgrounds/" + req.params.id);
					}
				});

			});
		}
	})
});

module.exports = router;