var nums = [45, 65, 77, 34];

nums.forEach(function(num){
	console.log(num);
})

function myForEach(arr, func)
{
	//loop through each element
	for(var i = 0; i < arr.length; i++)
	{
		//call func
		func(arr[i]);
	}
}

Array.prototype.myForEach = function(func)
{
	//loop through each element
	for(var i = 0; i < this.length; i++)
	{
		//call func
		func(this[i]);
	}
}