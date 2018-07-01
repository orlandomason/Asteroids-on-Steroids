function loadFiles() {
	
	require([
		'useful_functions',
		'ui_objects',
		'asteroid_spawning',
		'generate_map',
		'game'
		], function() {
	  	generateMap();
	});
}
