// Maths
function getRandomInt(min, max) {
    var min = Math.ceil(min);
    var max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
    // min and max inclusive
}

function getRandomFloat(min, max, decimal_places = 2) {
	var dp = Math.pow(10, decimal_places);
    return Math.round((Math.random()*(max - min) + min) * dp)/dp;
    // min and max inclusive and rounded to decimap_places
}

// Increments (or decrements) number by amount up to max (or min), if max is not defined number will always increment
function incrementNumber(num, amount, max = number + amount) {
	if (num < max) {
		num += amount;
	}
	return num;
}


// Game
function leftClick(l, t, r, b) {
    if (lmbu) {
        if ((l <= lmbux) && (r >= lmbux) && (t <= lmbuy) && (b >= lmbuy)) {
            return true;
        }
    }
}

function mouseOver(l, t, r, b) {
    if ((l <= mouse_x) && (r >= mouse_x) && (t <= mouse_y) && (b >= mouse_y)) {
        return true;
    }
}

function lmbSelect(object) {

    if (lmbu) {
        object.selected = leftClick(object.left, object.top, object.right, object.bottom);
    }
    if (object.selected) {
        object.select();
    }
}

// OSP: on-screen position
function getOSP(object) {

    let size = object.size; 
    let x = object.x;
    let y = object.y;

    object.zoomed_size = size * zoom;

    object.onscreen_x = x * zoom - camera_x * zoom - (object.zoomed_size / 2);
    object.onscreen_y = y * zoom - camera_y * zoom - (object.zoomed_size / 2);

    object.left = object.onscreen_x;
    object.right = object.onscreen_x + object.zoomed_size;
    object.top = object.onscreen_y;
    object.bottom = object.onscreen_y + object.zoomed_size;
}