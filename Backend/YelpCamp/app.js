//set up express
const express = require("express");
const app = express();

//get routes
const commentRoutes = require("./routes/comments"),
	  campgroundRoutes = require("./routes/campgrounds"),
	  indexRoutes = require("./routes/index");

//set up passport
const passport = require("passport"),
	  LocalStrat = require("passport-local");

//set up mongoose for Mongodb
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/yelp_camp", {useUnifiedTopology: true, useNewUrlParser: true});

//DBs set up
const Campground = require("./models/campground");
const Comment = require("./models/comment");
const User = require("./models/user");

//seed file
const seedDB = require("./seeds");
//seedDB();

//passport configuration
app.use(require("express-session")({
	secret: "These things are hard to come up with",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrat(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//set up the body parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

//get stylesheets
app.use(express.static(__dirname + "/public"));

//set the view engine
app.set("view engine", "ejs");

//setup express with the user for each page
app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	next();
});

//tell express to use the routes
app.use(indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

app.listen(3000, process.env.IP, () => {
	console.log("Server Started");
})