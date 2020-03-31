//create secret number
var secretNumber = 4;

//ask user for guess
var guess = prompt("Guess a number");

//since the prompt gives us a string, convert it back to a number
guess = Number(guess)

//check guess
if(guess === secretNumber)
{
	alert("Congratulations, you guessed the secret number")
}
else
{
	if(guess > secretNumber)
	{
		alert("You guessed to high");
	}
	else
	{
		alert("You guessed to low");
	}
}