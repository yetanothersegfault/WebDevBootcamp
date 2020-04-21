//array of all the colors
var numOfSquares = 6;
var colors = generateRandomColors(numOfSquares);

//get all the squares from the HTML document
var colorSquares = document.querySelectorAll(".square");

//select the color that is the winning condition
var pickedColor = pickColor();

//display the color we have to guess
var colorDisplay = document.getElementById("colorDisplay");
colorDisplay.textContent = pickedColor;

//get message span from the HTML
var messageDisplay = document.querySelector("#message");

//get the h1 to be able to change the color when the user selects the correct option
var h1 = document.querySelector("h1");

//difficulty buttons
var easyButton = document.querySelector("#easy");
var hardButton = document.querySelector("#hard");

//change the button selected and reset the colors
easyButton.addEventListener("click", function(){
	easyButton.classList.add("selected");
	hardButton.classList.remove("selected");
	numOfSquares = 3;
	colors = generateRandomColors(numOfSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	for(var i = 0; i < colorSquares.length; i++)
	{
		if(colors[i])
		{
			colorSquares[i].style.backgroundColor = colors[i];
		}
		else
		{
			colorSquares[i].style.display = "none";
		}
	}
});

hardButton.addEventListener("click", function(){
	easyButton.classList.remove("selected");
	hardButton.classList.add("selected");
	numOfSquares = 6;
	colors = generateRandomColors(numOfSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	for(var i = 0; i < colorSquares.length; i++)
	{
		colorSquares[i].style.backgroundColor = colors[i];
		colorSquares[i].style.display = "block";
	}
});

//get the button to reset/play again
var resetButton = document.querySelector("#reset");

//set the button click to reset the game
resetButton.addEventListener("click", function(){
	//get new colors
	colors = generateRandomColors(numOfSquares);
	//display the new colors
	for(var i = 0; i < colors.length; i++)
	{
		colorSquares[i].style.backgroundColor = colors[i];
	}
	//get the new randomly picked color
	pickedColor = pickColor();
	//set the color display
	colorDisplay.textContent = pickedColor;
	//reset the heading to be the orginal color
	h1.style.backgroundColor = "steelblue"
	//remove message
	messageDisplay.textContent = "";
	//reset the button label
	resetButton.textContent = "New Colors";

});

for(var i = 0; i < colorSquares.length; i++)
{
	//set each square to a color
	colorSquares[i].style.backgroundColor = colors[i];
	//give each square a click event
	colorSquares[i].addEventListener("click", function(){
		//grab color of clicked square
		var clickedColor = this.style.backgroundColor;
		//compare to picked color
		if(clickedColor === pickedColor)
		{
			messageDisplay.textContent = "Correct!";
			changeColors(clickedColor);
			resetButton.textContent = "Play Again?";
		}
		else
		{
			this.style.backgroundColor = "#232323";
			messageDisplay.textContent = "Try Again";
		}
	});
}

function changeColors(color)
{
	//loop through each square
	for(var i = 0; i < colorSquares.length; i++)
	{
		colorSquares[i].style.backgroundColor = color;
	}
	h1.style.backgroundColor = color;
}

function pickColor()
{
	return colors[Math.floor(Math.random() * colors.length)];
}

function generateRandomColors(num)
{
	//make the array
	var arr = [];
	//add num random colors to array
	for(var i = 0; i < num; i++)
	{
		//get random color
		//add to array
		arr.push(randomColor());
	}
	//return array
	return arr;
}

function randomColor()
{
	//pick a "red" from 0 - 255
	var red = Math.floor(Math.random() * 256);
	//pick a "green" from 0 - 255
	var green = Math.floor(Math.random() * 256);
	//pick a "blue" from 0 - 255
	var blue = Math.floor(Math.random() * 256);
	return "rgb(" + red + ", " + green + ", " + blue + ")";
}