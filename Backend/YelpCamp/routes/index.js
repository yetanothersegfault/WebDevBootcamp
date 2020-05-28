const express = require("express"),
	  router = express.Router(),
	  passport = require("passport"),
	  User = require("../models/user");

//landing page
router.get("/", (req, res) => {
	res.render("landing");
});

//==================
//Auth Routes

//show register form
router.get("/register", (req, res) => {
	res.render("register");
});

//handle sign up
router.post("/register", (req, res) => {
	const newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, (err, user) => {
		if(err)
		{
			console.log(err);
			req.flash("error", err.message);
			return res.redirect("/register");
		}
		passport.authenticate("local")(req, res, () => {
			req.flash("success", "Welcome to YelpCamp " + newUser.username);
			res.redirect("/campgrounds");
		})
	});
});

//show login form
router.get("/login", (req, res) => {
	res.render("login");
})

//log in the user
router.post("/login", passport.authenticate("local", {
	successRedirect: "/campgrounds",
	failureRedirect: "/login"
}), (req, res) => {});

//logout route
router.get("/logout", (req, res) => {
	req.logout();
	req.flash("success", "Logged Out!")
	res.redirect("/campgrounds");
})

module.exports = router;