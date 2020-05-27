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
			return res.render("register");
		}
		passport.authenticate("local")(req, res, () => {
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
	res.redirect("/campgrounds");
})

//check to see if the user is logged in
function isLoggedIn(req, res, next){
	if(req.isAuthenticated())
	{
		return next();
	}
	res.redirect("/login");
}

module.exports = router;