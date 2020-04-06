//reverse the order of the array
var arr = [1,2,3,4];
printReverse(arr);
arr = ["a", "b", "c", "d"];
printReverse(arr);

//check to see if each value within the array is the same
arr = [1,1,1,1];
console.log(isUniform(arr));
arr.push(2);
console.log(isUniform(arr));
arr = ["a", "b", "p"];
console.log(isUniform(arr));
arr = ["b", "b", "b"];
console.log(isUniform(arr));

//add up each element in an array and prints out the sum
//also show the max of each array
arr = [1,2,3];
console.log(sumArray(arr));
console.log(max(arr));
arr = [10,3,10,4];
console.log(sumArray(arr));
console.log(max(arr));
arr = [-5,100];
console.log(sumArray(arr));
console.log(max(arr));

function printReverse(array)
{
	//traverse the array from the end to the start
	for(var i = array.length -1; i >= 0; i--)
	{
		console.log(array[i]);
	}
}

function isUniform(array)
{
	//checks to see if the current index is the same as the previous one
	for(var i = 1; i < array.length; i++)
	{
		//if it is not, return false
		if(array[i] !== array[i-1])
		{
			return false;
		}
	}

	//we reach here if every element is the same.
	return true;
}

function sumArray(array)
{
	//start the sum
	var sum = 0;
	//iterate over each element and add to the sum
	//may want to check if it's a number? but doesn't matter here
	array.forEach(function(num){
		sum += num;
	})
	//return sum
	return sum;
}

function max(array)
{
	//assume first index is the max
	var max = array[0];
	//iterate over each element
	for(var i = 1; i < array.length; i++)
	{
		//check to see if current element is greater than the current max
		if(array[i] > max)
		{
			//if it is, set max to the current element
			max = array[i];
		}
	}

	//return max value
	return max
}