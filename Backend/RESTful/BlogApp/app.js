//node declarations
const express = require("express"),
	  app = express(),
	  bodyParser = require("body-parser"),
	  mongoose = require("mongoose");

//configure to use ejs
app.set("view engine", "ejs")
//configure to set up CSS folder
app.use(express.static("public"));
//configure body parser
app.use(bodyParser.urlencoded({extended: true}));

//set up mongoose
mongoose.connect("mongodb://localhost:27017/blog_app", {useUnifiedTopology: true, useNewUrlParser: true});

//set up schema
const blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
});

//set up model for database
const Blog = mongoose.model("Blog", blogSchema);

//RESTful Routes

//redirect root route to /blogs
app.get("/", (req, res) => {
	res.redirect("/blogs");
});

//Index route
app.get("/blogs", (req, res) => {
	//get all entries from the database
	Blog.find({}, (err, blogs) => {
		if(err)
		{
			console.log(err)
		}
		else
		{
			res.render("index", {blogs: blogs});
		}
	});
});

//New Route
app.get("/blogs/new", (req, res) => {
	res.render("new")
})

//Create Route
app.post("/blogs", (req, res) => {
	Blog.create(req.body.blog, (err, newBlog) => {
		if(err)
		{
			console.log(err);
			res.render("new");
		}
		else
		{
			console.log(newBlog);
			res.redirect("/blogs");
		}
	});
});


app.listen(3000, process.env.IP, () => {
	console.log("Server Started");
})
