
var asteroids = [];

// In metres
var asteroid_max_size = 100;
var asteroids_min_size = 50;

var chance_of_max_size = 0.01;
var number_of_asteroids = 100;

function generateMap(width, height, asteroid_density) {

	var asteroid_count = 0;

	for (var i = asteroid_max_size; i > asteroid_min_size; i--) {

		// Average Number of asteroids at asteroid size i = Math.round( (max_asteroid_size)^3 * asteroid_size^-3)

		var average_number = Math.pow(asteroid_max_size, 3) * Math.pow(asteroid_size, -3);


		}

		for (var j = 0; j < noaaasi; j++) {

			asteroids.push(new asteroid("c-type", ));
			asteroid_count++;

			if (asteroid_count >= number_of_asteroids) {
				// break for loop
			}
		}
	}
}