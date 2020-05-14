//set up express
const express = require("express");
const app = express();
//const request = require("request");

//set up the body parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

//get stylesheets
app.use(express.static("public"));

//setup temp array for campgrounds
const campgrounds = [
	{name: "Salmon Creek", image: "https://images.unsplash.com/photo-1471115853179-bb1d604434e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1559&q=80"},
	{name: "Foggy Peaks", image: "https://images.unsplash.com/photo-1545572695-789c1407474c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"}, 
	{name: "Starry Forrest", image: "https://images.unsplash.com/photo-1539679121360-846d7d42d802?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2752&q=80"},
	{name: "Salmon Creek", image: "https://images.unsplash.com/photo-1471115853179-bb1d604434e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1559&q=80"},
	{name: "Foggy Peaks", image: "https://images.unsplash.com/photo-1545572695-789c1407474c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"}, 
	{name: "Starry Forrest", image: "https://images.unsplash.com/photo-1539679121360-846d7d42d802?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2752&q=80"},
	{name: "Salmon Creek", image: "https://images.unsplash.com/photo-1471115853179-bb1d604434e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1559&q=80"},
	{name: "Foggy Peaks", image: "https://images.unsplash.com/photo-1545572695-789c1407474c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"}, 
	{name: "Starry Forrest", image: "https://images.unsplash.com/photo-1539679121360-846d7d42d802?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2752&q=80"}
]

//set the view engine
app.set("view engine", "ejs");

//landing page
app.get("/", (req, res) => {
	res.render("landing");
});

//lists all the campgrounds currently in system
app.get("/campgrounds", (req, res) => {
	res.render("campgrounds", {campgrounds: campgrounds});
});

//route to form that adds new campgrounds
app.get("/campgrounds/new", (req, res) => {
	res.render("new");
});

//get a new campground entry
app.post("/campgrounds", (req, res) => {
	//get data from form
	const campName = req.body.campName;
	const url = req.body.imageURL;
	
	//add to campgrounds array
	campgrounds.push({name: campName, image: url});
	
	//redirect to camgrounds page
	res.redirect("/campgrounds");
});

app.listen(3000, process.env.IP, () => {
	console.log("Server Started");
})