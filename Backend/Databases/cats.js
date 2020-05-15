var mongoose = require("mongoose");

//set up mongoose to connect to mongo
mongoose.connect("mongodb://localhost:27017/cat_app", {useNewUrlParser: true});