var todos = [];

window.setTimeout(function(){

	var input = prompt("What would you like to do?");
	
	while(input !== "quit")
	{
		if(input === "new")
		{
			todos.push(prompt("Enter a new Todo"));
		}
		if(input === "list")
		{
			console.log(todos);
		}

		input = prompt("What would you like to do");
	}

},500);