//node declarations
const express = require("express"),
	  app = express(),
	  bodyParser = require("body-parser"),
	  mongoose = require("mongoose");

//configure to use ejs
app.set("view engine", "ejs")
//configure to set up CSS folder
app.use(express.static("static"));
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

//to create one database entry
Blog.create({
	title: "Test",
	image: "https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60", 
	body: "This is a test"
})

//RESTful Routes

//Index route


app.listen(3000, process.env.IP, () => {
	console.log("Server Started");
})
