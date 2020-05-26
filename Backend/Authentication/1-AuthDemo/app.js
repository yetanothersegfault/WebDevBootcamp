//Require statments
const express = require("express"),
	  mongoose = require("mongoose"),
	  passport = require("passport"),
	  bodyParser = require("body-parser"),
	  localStrat = require("passport-local"),
	  passportLocalMongoose = require("passport-local-mongoose"),
	  User = require("./models/user");

//Express and mongoose set up
const app = express();
app.use(require("express-session")({
	secret: "This is the secret",
	resave: false,
	saveUninitialized: false
}));

mongoose.connect("mongodb://localhost:27017/auth_demo", {useUnifiedTopology: true, useNewUrlParser: true});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrat(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Routes
app.get("/", (req, res) => {
	res.render("home");
});

app.get("/secret", isLoggedIn, (req, res) => {
	res.render("secret");
});

//Auth Routes
//show register form
app.get("/register", (req, res) => {
	res.render("register");
});

//handle the user registration
app.post("/register", (req, res) => {
	User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
		if(err)
		{
			console.log(err);
			return res.render("register");
		}
		else
		{
			passport.authenticate("local")(req, res, () => {
				res.redirect("/secret");
			});
		}
	});
});

//Login Routes
//show log in form
app.get("/login", (req, res) => {
	res.render("login");
});

//handle user log in
app.post("/login", passport.authenticate("local" , {
	successRedirect: "/secret",
	failureRedirect: "/login"
}), (req, res) => {});

//Logout Route
app.get("/logout", (req, res) => {
	req.logout();
	res.redirect("/");
})

function isLoggedIn(req, res, next){
	if(req.isAuthenticated())
	{
		return next();
	}
	res.redirect("/login");
}

app.listen(3000, process.env.IP, () => {
	console.log("Server Started");
})