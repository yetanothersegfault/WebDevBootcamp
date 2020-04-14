//get the buttons for the events
var p1Button = document.querySelector("#p1");
var p2Button = document.querySelector("#p2");
var resetButton = document.querySelector("#reset");

//get the spans that contain the scores in the heading
var p1Span = document.querySelector("#p1Score");
var p2Span = document.querySelector("#p2Score");

//get the input that tells what number we are playing to
var numInput = document.querySelector("input");
var winningScoreDisplay = document.querySelector("p span");

//keep track of the score. Both start at 0
var p1Score = 0;
var p2Score = 0;

//keep track of if the game is still running
var gameOver = false;
var winningScore = 5;

//add to the player one score
p1Button.addEventListener("click", function(){
	if(!gameOver)
	{
		p1Score++;
		p1Span.textContent = p1Score;
		if(p1Score === winningScore)
		{
			gameOver = true;
			p1Span.classList.add("winner");
		}
	}
});

//add to the player two score
p2Button.addEventListener("click", function(){
	if(!gameOver)
	{
		p2Score++;
		p2Span.textContent = p2Score;
		if(p2Score === winningScore)
		{
			gameOver = true;
			p2Span.classList.add("winner");
		}
	}
});

//reset the scores and game
resetButton.addEventListener("click", reset);

//get the input from the user and set it as the winning score
numInput.addEventListener("change", function(){
	if(numInput.value > 0)
	{
		winningScoreDisplay.textContent = numInput.value;
		winningScore = parseInt(numInput.value);
		reset();
	}
})

function reset()
{
	gameOver = false;
	p1Score = 0;
	p2Score = 0;

	p1Span.textContent = p1Score;
	p1Span.classList.remove("winner");

	p2Span.textContent = p2Score;
	p2Span.classList.remove("winner");
}