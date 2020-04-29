//check off specific todos from list
$("ul").on("click", "li", function(){
	$(this).toggleClass("completed");
});

//remove item from list when delete button is clicked
$("ul").on("click", "span", function(event){
	//fade the element out
	$(this).parent().fadeOut(500, function(){
		//remove the item from the list
		$(this).remove();
	});

	//prevent this click from bubbling up to the parent elements
	event.stopPropagation();
});

/*
	Note for self
	the on event listener for the li/span will only fire for existing elements

	We have to set the on listener on the main parent element, this case the ul element.
	We have to add an extra argument in to the click listener.
	It will end up looking like this:
	$("parentElement").on("event", "elementToAdd", function)
	This will ensure that future added elements will also get the event listeners added to them.
*/

//add items to the list
$("input[type='text']").keypress(function(event){
	//check to see if it is the enter key
	if(event.which === 13)
	{
		//get the text that should be added
		var text = $(this).val();
		//check to make sure the text box is not empty
		if(!(text === ""))
		{
			//add to the list
			$("ul").append("<li><span><i class=\"fas fa-minus\"></i></span> " + text + "</div>");
			//clear the text box
			$(this).val("");
		}
	}
});

//add click listener to the plus to make the text box appear and disappear
$(".fa-plus").on("click", function(){
	$("input[type='text']").fadeToggle();
});