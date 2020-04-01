var complete = false;

while(!complete)
{
	var ans = prompt("Are we there yet?");
	if(ans === "yes" || ans === "yeah")
	{
		alert("Yay, we finally made it!")
		complete = true;
	}
}

//second Annoy-O-Matic

complete = false;

while(!complete)
{
	var ans = prompt("Are we there yet?");
	if(ans.indexOf("yes") !== -1)
	{
		alert("Yay, we finally made it!");
		complete = true;
	}
}