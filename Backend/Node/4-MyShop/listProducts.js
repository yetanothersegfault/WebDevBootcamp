var faker = require("faker");

console.log("=======================");
console.log("WELCOME TO MY SHOP!!");
console.log("=======================");

for(var i = 0; i < 10; i++)
{
	//get the random product
	var product = faker.commerce.product();
	//get a random product adjective
	var productAdj = faker.commerce.productAdjective();
	//get a random product material
	var productMat = faker.commerce.productMaterial();
	//get fake random price
	var price = faker.commerce.price();
	
	//print out the item and price
	console.log(productAdj + " " + productMat + " " + product + ": $" + price);
}