const request = require('request');
request('http://api.openweathermap.org/data/2.5/weather?q=Honolulu&APPID=772383519cf73586a0f4162c9435c9f0', function (error, response, body) {
	console.error('error:', error); // Print the error if one occurred
  	console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
	
	//parse the data into a JSON obkect
	var data = JSON.parse(body);
	
	//console.log(data);
	
	//since the format of the openweather sunset API doesn't have any documentation
	//I am using another API to get the sunset time
	//have to parse the lon and lat of the location
	var lon = data["coord"]["lon"];
	var lat = data["coord"]["lat"];
	
	//console.log("lon: " + lon + " lat: " + lat);
	
	//get the url for the api call
	var timeUrl = "https://api.sunrise-sunset.org/json?lat=" + lat +"&lng=" + lon;
	
	//make request
	request(timeUrl, function(error, responce, body){
		//parse the json data
		var timeData = JSON.parse(body);

		//get the time.
		//this is in UTC.  Will leave that way for now...
		var sunsetTime = timeData["results"]["sunset"];
		console.log(sunsetTime + " UTC");
	});
});