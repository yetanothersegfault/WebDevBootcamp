const express = require("express"),
	  app = express();

app.set("view engine", "ejs");

//Root Route
app.get("/", (req, res) => {
	res.render("home");
});

//Root Route
app.get("/about", (req, res) => {
	res.render("about");
});

app.listen(process.env.PORT, process.env.IP, () => {
	console.log("Server Started");
})