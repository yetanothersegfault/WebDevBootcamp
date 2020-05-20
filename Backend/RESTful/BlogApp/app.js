//node declarations
const express = require("express"),
	  app = express(),
	  bodyParser = require("body-parser"),
	  mongoose = require("mongoose"),
	  methodOverride = require("method-override"),
	  expressSanitizer = require("express-sanitizer");

//configure to use ejs
app.set("view engine", "ejs")
//configure to set up CSS folder
app.use(express.static("public"));
//configure body parser
app.use(bodyParser.urlencoded({extended: true}));
//set up express to use method-override
app.use(methodOverride("_method"));
//set up express with the sanitizer
app.use(expressSanitizer());

//set up mongoose
mongoose.connect("mongodb://localhost:27017/blog_app", {useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false});

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
	//sanitize the incoming body of script tags so no harmful js can be run
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.create(req.body.blog, (err, newBlog) => {
		if(err)
		{
			console.log(err);
			res.render("new");
		}
		else
		{
			res.redirect("/blogs");
		}
	});
});

//Show Route
app.get("/blogs/:id", (req, res) => {
	Blog.findById(req.params.id, (err, blog) => {
		if(err)
		{
			console.log(err);
			res.redirect("/blogs");
		}
		else
		{
			res.render("show", {blog: blog});
		}
	})
});

//Edit Route
app.get("/blogs/:id/edit", (req, res) => {
	Blog.findById(req.params.id, (err, blog) => {
		if(err)
		{
			console.log(err);
			res.redirect("/blogs");
		}
		else
		{
			res.render("edit", {blog: blog});
		}
	});
});

//Update Route
app.put("/blogs/:id", (req, res) => {
	//sanitize the incoming body of script tags so no harmful js can be run
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updateBlog) => {
		if(err)
		{
			console.log(err);
			res.redirect("/blogs");
		}
		else
		{
			res.redirect("/blogs/" + req.params.id);
		}
	});
});

//Delete Route
app.delete("/blogs/:id", (req, res) => {
	Blog.findByIdAndRemove(req.params.id, (err) => {
		if(err)
		{
			console.log(err);
			res.redirect("/blogs");
		}
		else
		{
			res.redirect("/blogs");
		}

	});
})


app.listen(3000, process.env.IP, () => {
	console.log("Server Started");
})
