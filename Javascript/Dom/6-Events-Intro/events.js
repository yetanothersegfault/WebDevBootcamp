var button = document.querySelector("button");
var p = document.querySelector("p");

button.addEventListener("click", changeText)

var heading = document.querySelector("h1");

heading.addEventListener("click", function(){
	heading.style.color = "blue";
})

var lis = document.querySelectorAll("li");

for(var i = 0; i < lis.length; i++)
{
	lis[i].addEventListener("click", function(){
		this.style.color = "purple";
	})
}

function changeText(){
	p.textContent = "Someone Clicked The Button";
}