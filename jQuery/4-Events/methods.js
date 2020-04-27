//add event to the only h1 on the page
$("h1").click(function(){
	alert("h1 clicked");
});

//add event to each button
$("button").click(function(){
	var text = $(this).text();
	console.log("You Clicked " + text);
	$(this).css("backgroundColor", "pink");
});

//add a keypress function on the input form
$("input").keypress(function(event){
	if(event.which === 13)
	{
		alert("You hit enter");
	}
	console.log(event);
});

//add click listener with .on() method
$("h1").on("click", function(){
	$(this).css("color", "purple");
});

//add keypress listener with .on() method
$("input").on("keypress", function(){
	console.log("You pressed a key");
})

//add bolded text to button when mouse over
//using .on() using mouseenter
$("button").on("mouseenter", function(){
	$(this).css("font-weight", "bold");
});

//set font back to normal when mouse leaves the button
//using .on() and mouseleave
$("button").on("mouseleave", function(){
	$(this).css("font-weight", "normal");
});