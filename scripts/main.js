function loadFiles() {
	
	require([
		'useful_functions',
		'ui_objects',
		'asteroid_spawning',
		'generate_map',
		'game'
		], function() {

	  	setTimeout(loadGame, 1000);
	});
}
function loadGame() {
	startGame();
}