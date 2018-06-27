
var asteroids = [];

// In metres
var asteroid_max_size = 100;
var asteroid_min_size = 1;
var number_of_asteroids = 100;

var average_number_of_max_size = 0.2; 
// A value of 0.5 would mean on average there are 0.5 asteroids of the size asteroid_max_size
// This affects the average number of all the asteroids smaller than this as well
// On average there are 8 times as many asteroids each time you halve the size

var chance_of_max_size = 0.5; // Must be less than 1! 
/* 
This is the recurring probability of a max_size_asteroid being spawned and affects the probability of all the asteroids smaller asteroids as well. If chance_of_max_size = 0.5, then there is 50% chance of 1 asteroid, 25% chance of 2, 12.5% chance of 3, and so on. If you make asda < 1, it will calculate the recurring probability multiple times and take the average, which in this case would be around 1.
Here's an example when chance_of_max_size = 0.5 and asda = 10:  [1,0,0,1,0,3,0,0,3,2] => average is the sum divided by 10, which is 1, which means 1 asteroid at asteroid_max_size.
If asda is more than one, it's better to use average_number_of_max_size because it's easier to understand.
*/
// Set this to true to use chance_of_max_size instead of average_number_of_max_size
var use_chance_of_max_size = false;

var asda = 10; // asteroid size distrbution averaging, must be 1 or more and preferably not too big (like 1000 or more)
// The higher it is the more even the distribution asteroids from large to small

function generateMap(width, height, asteroid_density) {

	var avn = -chance_of_max_size / (chance_of_max_size - 1);

	if (use_chance_of_max_size) {
		var exponent = Math.log(Math.pow(asteroid_max_size, 3) * avn) / Math.log(asteroid_max_size);
	}
	else {
		var exponent = Math.log(Math.pow(asteroid_max_size, 3) * average_number_of_max_size) / Math.log(asteroid_max_size);
	}


	var asteroid_count = 0;

	loop1:
	for (var i = asteroid_max_size; i > asteroid_min_size; i--) {

		// Average Number of asteroids at asteroid size i = Math.round( (max_asteroid_size)^exponent * asteroid_size^-3)
		var average_number = Math.pow(asteroid_max_size, exponent) * Math.pow(i, -3);

		// Probability to get average number
		var p = 1 - 1/(average_number+1);

		// This block of code generates the number of asteroids for size i
		// Make sure p is not 1 or more, otherwise you'll get infinity loop
		if (p < 1) { 	

			var arr = [];

			for (var k = 0; k < asda; k++) {

			  var count = 0;

			    while (Math.random() < p) {
			        count++; 
			    }
			    arr[k] = count;
			}
			var sum, avg = 0;

			// Dividing by 0 will return Infinity, arr must contain at least 1 element to use reduce
			if (arr.length) {
			    sum = arr.reduce(function(a, b) { return a + b; });
			    avg = Math.round(sum / arr.length); /// avg is the number of asteroids to spawn of size i
			}			
		} 

		else { alert("probability (var p) was equal to or more than 1") }


		loop2:
		for (var j = 0; j < avg; j++) {

			asteroids.push(i);
			asteroid_count++;

			if (asteroid_count >= number_of_asteroids) {
				break loop1;  // breaks out of loop2 and loop1
			}
		}
	}
}