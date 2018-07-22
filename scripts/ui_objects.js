
function standardButton(text, width, font_size = 14, font = "Trebuchet MS") {
    
    this.text = text;
    this.width = width;

    let button_height = font_size * 2;
    let nof_buttons = text.length;
    this.height = button_height * nof_buttons;

    this.render = function(x, y) {
        this.x = x;
        this.y = y;

        let grd = ctx.createLinearGradient(x, y, x+width, y);
        grd.addColorStop(0, "black");
        grd.addColorStop(0.5, "white");
        grd.addColorStop(1, "black");
        ctx.strokeStyle = grd;
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let i = 0; i <= nof_buttons; i++) {
            ctx.moveTo(x, y+(button_height*i));
            ctx.lineTo(x+width, y+(button_height*i));
        }
        ctx.stroke();

        ctx.font = font_size + "px " + font;
        ctx.fillStyle = "rgb(200, 200, 200)";
        ctx.textAlign = "center";
        for (let i = 0; i < this.text.length; i++) {
            ctx.fillText(this.text[i], this.x+this.width/2, this.y+(button_height/21)*13+(i*button_height));
        }

        /*ctx.fillText(this.text+" ("+scans_left+" left)", this.x+this.width/2, this.y+(button_height/21)*13);
        ctx.fillText(this.text[i], this.x+this.width/2, this.y+(button_height/21)*13);*/
    }

    this.clicked = function() {

        let left = this.x;
        let right = this.x+this.width;

        let clicked = false;

        for (var i = 0; i < nof_buttons; i++) {

            let top = this.y + (i*button_height);
            let bottom = top + button_height;

            if (leftClick(left, top, right, bottom)) {
                clicked = i+1;
            }
        }
        return clicked;
    }


}

/*
function standardButton(text, font_size = 16, font = "Courier New bold") {
    
    this.text = text;
    this.width = font_size * text.length;
    this.height = font_size * 2;

    this.changeText = function(new_text) {
        this.text = new_text;
        this.width = font_size * new_text.length;
        this.height = font_size * 2;
    }
    this.render = function(x, y) {
        this.x = x;
        this.y = y;

        ctx.fillStyle = 'lightgrey';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeStyle = 'grey';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.font = font_size + " " + font;
        ctx.fillStyle = "rgb(217, 217, 50)";
        ctx.textAlign = "center";
        ctx.fillText(this.text, this.x+this.width/2, this.y+(this.height/21)*13);
    }
    this.clicked = function(click_x, click_y) {
        var left = this.x;
        var right = this.x+this.width;
        var top = this.y;
        var bottom = this.y+this.height;
        var clicked = false;

        let aclick_x = canvas_1.left_click_x;
        let aclick_y = canvas_1.left_click_y;

        if ((bottom > aclick_y) && (top < aclick_y) && (right > aclick_x) && (left < aclick_x)) {
            clicked = true;
        }
        return clicked;
    }
}*/