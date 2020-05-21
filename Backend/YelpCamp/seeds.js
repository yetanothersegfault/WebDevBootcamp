const mongoose = require("mongoose"), 
	  Campground = require("./models/campground"),
	  Comment = require("./models/comment");

const seeds = [
	{
		name: "Salmon Creek",
		image: "https://images.unsplash.com/photo-1471115853179-bb1d604434e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1559&q=80",
		description: "Wonderful fishing river with luxurious campgrounds to boot."
	},
	{
		name: "Foggy Peaks",
		image: "https://images.unsplash.com/photo-1545572695-789c1407474c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
		description: "Nestled in the Mountains, overlooking a valley that fills with fog early in the mornings."
	},
	{
		name: "Starry Forest",
		image: "https://images.unsplash.com/photo-1539679121360-846d7d42d802?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2752&q=80",
		description: "Campground in the middle of nowhere allowing for spectacular views of the stars above."
	},
	{
		name: "Mountain Basin Park",
		image: "https://images.unsplash.com/photo-1518110767214-c10a1c3a773e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
		description: "Camp site at the base of a mountain allows for vehicular access and glamping in autos."
	}
];

//removes all camprounds and comment and reseeds them with the seeds data
//also adds a comment to each seed
//this also uses async and await to ensure that each command is completed
//before going on to the next one
async function seedDB()
{
	try {
		//clear db of all campgrounds and comments
		await Campground.remove({});
		console.log("Campgrounds cleared");
		await Comment.remove({});
		console.log("Commentss cleared");

		//add each element of the seeds array and add a comment to each
		//using for of notation
		for(const seed of seeds)
		{
			//using let which is like var but only exists for this block
			//make and save the campground in the db
			let campground = await Campground.create(seed);
			console.log("Campground created");
			//make comment
			let comment = await Comment.create({
				text: "This place is great, but I wish there was internet",
				author: "Homer"
			});
			//reference the comment in to which campground it belongs
			campground.comments.push(comment);
			//save the comment
			campground.save()
		}
	} catch (err) {
		console.log(err);
	}
	
}

module.exports = seedDB;

//This deviates from the lesson to reflect the update by TA Ian
//source: https://www.youtube.com/watch?v=D_q-sQCdZXw&t=383s