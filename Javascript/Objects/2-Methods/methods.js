var object = {
	name: "Chuck",
	age: 45,
	isCool: false,
	friends: ["Bob", "Tina"],
	add: function(x,y){
		return x + y;
	}
}

var dogSpace = {};
dogSpace.speak = function() {
	return "WOOF!";
}

var catSpace = {};
catSpace.speak = function() {
	return "MEOW!";
}

var comments = {};
comments.data = ["Good Job!", "Bye", "Lame..."];

//prints the array, but requires the array to be passed in
function print(arr){
	arr.forEach(function(el){
		console.log(el);		
	});
}

//print arrays stored within the object by using the keyword this
//this calls the object, we still have to declare what items/data we want to print
//but this allows us to just call comments.print()
comments.print = function(){
	this.data.forEach(function(el){
		console.log(el);		
	});
}
