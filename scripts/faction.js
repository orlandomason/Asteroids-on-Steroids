
function faction(player) {
	
}


var game_speed = 1;
var game_time = 0;
var date = new Date(0, 0);
date.setFullYear(0);

function updateTime() {

	date.setMilliseconds(1000/fps*game_time);

	let year = date.getFullYear();
	let month = date.getMonth()+1;
	let day = date.getDate();

	let text =  day + " " + month + " " + year;
	ctx.fillText();


    game_time += game_speed;
}
