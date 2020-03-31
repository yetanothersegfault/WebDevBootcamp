var age = prompt("What is your age?");

//ensure the value isn't negative
if(age < 0)
{
    console.log("Cannot have negative age");
}

if(age == 21)
{
    console.log("happy Birthday");
}

if(age % 2 != 0)
{
	console.log("your age is odd");
}

if(age % Math.sqrt(age) === 0)
{
	console.log("your age is a perfect square")
}
