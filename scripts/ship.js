
var ships = {
	construction_ship: {class: "Construction Ship", width: 100, height: 10, }
};


function ship(type, pos_x, pos_y) {

	this.type = type;
	this.x = pos_x;
	this.y = pos_y;
	this.size = 63;
	this.rotation = 0*Math.PI/180;

	let rotation_speed = 0.01;

	let image = new Image();
    image.src = 'ship_icon2.png';

	this.update = function() {

		getOSP(this, this.size, this.x, this.y);
		lmbSelect(this);
		centre_x = this.onscreen_x + this.zoomed_size/2;
        centre_y = this.onscreen_y + this.zoomed_size/2;

		ctx.save(); 
		 
		ctx.translate(centre_x, centre_y); 
		 
		ctx.rotate(this.rotation);

		ctx.drawImage(image, -this.zoomed_size/2, -this.zoomed_size/2); 

		ctx.restore();
	}

	this.select = function() {

		ctx.strokeStyle = "white";
		ctx.lineWidth = 2;
		ctx.beginPath();
        ctx.arc(centre_x, centre_y, this.zoomed_size, 0, 2*Math.PI);
        ctx.stroke();

		if (keys[87]) {
			this.y += Math.sin(this.rotation);
			this.x += Math.cos(this.rotation);
		}
		if (keys[68]) {
			this.rotation += 0.01;
		}
		if (keys[65]) {
			this.rotation -= 0.01;
		}

		if (rmbu) {
			let direction = Math.atan2(this.onscreen_y - Math.round(rmbuy), this.onscreen_x - Math.round(rmbux));
		}
	}

	this.move = function() {
		
		if (this.rotation > direction) { 
			this.rotation -= rotation_speed;
		}
		else if (this.rotation < direction) { 
			this.rotation += rotation_speed;
		}
		else {}
	}
}

var ship1 = new ship("type", 3945, 3945);