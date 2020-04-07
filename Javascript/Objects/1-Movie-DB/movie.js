var movieArr = [];

getMovies();
printMovies();


function getMovies()
{
var cont = prompt("Enter add to add new movie");

while(cont  === "add")
{
		//get the movie title
		var movieTitle = prompt("Enter the movie title");
		var movieRating = prompt("Enter the rating 1-5");
		var haveSeen = prompt("enter yes if you have seen this movie");

		if(haveSeen === "yes")
		{
			haveSeen = true;
		}
		else
		{
			haveSeen = false;
		}

		//create new object
		var movie = {
			title: movieTitle,
			rating: movieRating,
			seen: haveSeen
		}

		//add the movie to the array
		movieArr.push(movie);

		cont = prompt("Enter add to add new movie");
	}
}

function printMovies()
{
	for(var i = 0; i < movieArr.length; i++)
	{
		if(movieArr[i].seen)
		{
			console.log("You have watched \"" + movieArr[i].title + "\" - " + movieArr[i].rating + " stars");
		}
		else
		{
			console.log("You have not watched \"" + movieArr[i].title + "\" - " + movieArr[i].rating + " stars");
		}
	}
}