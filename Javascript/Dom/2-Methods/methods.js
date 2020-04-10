//get an element by an id
console.log("getting an element by id");
var tag = document.getElementById("highlight");
console.log(tag);

//get all elements with a given class name
console.log("getting all elements with a give class");
var tags = document.getElementsByClassName("bolded");
for(var i = 0; i < tags.length; i++)
{
	console.log(tags[i]);
}

//get all elements with a certain tag
console.log("getting all elements with a certain tag")
var allElements = document.getElementsByTagName("li");
for(var i = 0; i < allElements.length; i++)
{
	console.log(allElements[i]);
}

//getting the body by tag name can be done with .getElementByTagName("body")[0]
//because there is only one instance of the body and we dont need the whole array
console.log("getting just the body");
var body = document.getElementsByTagName("body")[0];
console.log(body);

//using querySelector to get an element with an id
//querySelector can select with any CSS-Style tag
console.log("getting an element with an id using querySelect");
var tag = document.querySelector("#highlight");
console.log(tag);

//we can also use querySelector to select the first of a given class
console.log("getting the first element of a given class");
var tag = document.querySelector(".bolded");
console.log(tag);

//Also a querySelectorAll to select all elements with a given CSS-Selector tag
//this will grab all elements with the tag of h1
console.log("getting all element of h1 using the querySelectorAll method");
var tags = document.querySelectorAll("h1");
for(var i = 0; i < tags.length; i++)
	console.log(tags[i]);

//grab all elements with class bolded using querySelectAll
console.log("getting all elements with the class bolded using querySelectAll");
var elements = document.querySelectorAll(".bolded");
for(var i = 0; i < tags.length; i++)
	console.log(elements[i]);
