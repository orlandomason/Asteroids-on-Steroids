/*function loadFiles() {
	
	require([
		// These files only contain functions
		'useful_functions',
		'ui_objects',
		'asteroid_spawning',

		// These files declare global variables
		'generate_map',
		'camera',
		'game'
		], function() {
	  	generateMap();
	});
}*/

function loadFiles() {

	var requireQueue = function(modules, callback) {
	  function load(queue, results) {
	    if (queue.length) {
	      require([queue.shift()], function(result) {
	        results.push(result);
	        load(queue, results);
	      });
	    } else {
	      callback.apply(null, results);
	    }
	  }

	  load(modules, []);
	};

	requireQueue([
		// These files only contain functions
		'useful_functions',
		'ui_objects',
		'asteroid_spawning',

		// These files declare global variables
		'generate_map',
		'camera',
		'game'
		], function() {
	  	generateMap();
	});
}