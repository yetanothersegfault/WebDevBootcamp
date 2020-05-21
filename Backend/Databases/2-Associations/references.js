const mongoose = require("mongoose");

//set up mongoose
mongoose.connect("mongodb://localhost:27017/blog_demo_reference", {useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false});

const Post = require("./models/post");
const User = require("./models/user")

// User.create({
// 	email: "bob@bob.com",
// 	name: "Bobert"
// })

Post.create({
	title: "How to cook the best burger PT 4",
	content: "JK GET IN THE KITCHEN AND SAVE MONEY!"
}, (err, post) => {
	if(err)
	{
		console.log(err);
	}
	else
	{
		console.log(post);
		User.findOne({email: "bob@bob.com"}, (err, user) => {
			if(err)
			{
				console.log(err);
			}
			else
			{
				user.posts.push(post);
				user.save((err, savedUser) => {
					if(err)
					{
						console.log(err);
					}
					else
					{
						console.log(savedUser);
					}
				})
			}
		})
	}
});


//Find user
//Find all posts for that user

// User.findOne({name: "Bobert"}).populate("posts").exec((err, user) => {
// 	if(err)
// 	{
// 		console.log(err);
// 	}
// 	else
// 	{
// 		console.log(user);
// 	}
// });