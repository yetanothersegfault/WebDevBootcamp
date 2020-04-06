var todos = [];

window.setTimeout(function(){

	var input = prompt("What would you like to do?");
	
	while(input !== "quit")
	{
		if(input === "new")
		{
			addTodo();
		}else if(input === "list")
		{
			listTodos();
		}else if(input === "delete")
		{
			deleteTodo();
		}

		input = prompt("What would you like to do");
	}

},500);


function listTodos()
{
	console.log("**********");
	todos.forEach(function(todo, i, list){
		console.log(i + ": " + todo);
	})
	console.log("**********");
}

function addTodo()
{
	var toAdd = prompt("Enter a new Todo");
	todos.push(toAdd);
	console.log(toAdd + " added to the list");
}

function deleteTodo()
{
	var index = prompt("Enter index of todo to delete")
	todos.splice(index, 1);
}