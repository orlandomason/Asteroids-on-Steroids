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