var mongoose = require("mongoose");

//set up mongoose to connect to mongo
mongoose.connect("mongodb://localhost:27017/cat_app", {useUnifiedTopology: true, useNewUrlParser: true});

//set up cat schema
var catSchema = new mongoose.Schema({
	name: String,
	age: Number,
	temperament: String 	
});

//set up model
var Cat = mongoose.model("Cat", catSchema);

//adding a new cat to the DB

//create the object
// var george = new Cat({
// 	name: "Mrs. Norris",
// 	age: 7,
// 	temperament: "Evil"
// });

// //save the object
// george.save((err, cat) => {
// 	if(err)
// 	{
// 		console.log("Something went wrong adding to the db");
// 	} 
// 	else
// 	{
// 		console.log("Object saved in DB:");
// 		console.log(cat);
// 	}
// });

//can also use the .create command
//basically is the new and save command combined
Cat.create({
	name: "Athena",
	age: 5,
	temperament: "Loving"
}, (err, cat) => {
	if(err)
	{
		console.log(err);
	} 
	else
	{
		console.log("Object saved in DB:");
		console.log(cat);
	}
});

//Retrieve cats from the db
Cat.find({}, (err, cats) => {
	if(err)
	{
		console.log("Error:");
		console.log(err)
	}
	else
	{
		console.log("All the cats");
		console.log(cats);
	}
});