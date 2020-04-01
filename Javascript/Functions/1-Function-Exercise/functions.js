//get number and check if it is even
function isEven(num)
{
	if(num % 2 === 0)
		return true;
	else
		return false;
}

//factorial
function factorial(num)
{
	var count = 1;
	while(num > 0)
	{
		count = count * num;
		num--;
	}
	return count;
}

//Kebab-Case to Snake_Case
function kebabToSnake(str)
{
	while(str.indexOf("-") !== -1)
	{
		str = str.replace("-","_");
	}
	return str
}





