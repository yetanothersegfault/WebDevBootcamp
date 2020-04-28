//check off specific todos from list
$("li").on("click", function(){
	$(this).toggleClass("completed");
});