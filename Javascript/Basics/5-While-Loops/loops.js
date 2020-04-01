console.log("PRINT ALL NUMBERS BETWEEN -10 AND 19");

var i = -10;

while(i < 20)
{
	console.log(i);
	i++
}

console.log("PRINT ALL EVEN NUMBERS BETWEEN 10 AND 40");

i = 10;

while(i <= 40)
{
	if(i % 2 === 0)
	{
		console.log(i);
	}
	i++;
}

console.log("PRINT ALL ODD NUMBERS BETWEEN 300 AND 333");

i = 300;

while(i <= 333)
{
	if(i % 2 === 1)
	{
		console.log(i);
	}
	i++;
}

console.log("PRINT ALL NUMBERS DIVISIBLE BY 5 AND 3 BETWEEN 5 AND 50");

i = 5;

while(i < 50)
{
	if((i % 5 === 0) && (i % 3 === 0))
	{
		console.log(i);
	}
	i++;
}