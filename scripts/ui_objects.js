
function createButton(x, y, font_size, type, text, active = false) {
    
    this.type = type;
    this.text = text;
    this.active = active;
    this.width = font_size * text.length;
    this.height = font_size * 2;

    this.changeText = function(new_text) {
        this.text = new_text;
        this.width = font_size * new_text.length;
        this.height = font_size * 2;
    }
    this.render = function() {
        ctx.fillStyle = 'lightgrey';
        ctx.fillRect(x, y, this.width, this.height);
        ctx.strokeStyle = 'grey';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, this.width, this.height);

        ctx.font = font_size + 'px Courier New';
        ctx.fillStyle = 'black';
        ctx.textAlign = "center";
        ctx.fillText(this.text, x+this.width/2, y+(this.height/21)*13);
    }
    this.clicked = function(click_x, click_y) {
        var left = x;
        var right = x+this.width;
        var top = y;
        var bottom = y+this.height;
        var clicked = true;
        if ((bottom < click_y) || (top > click_y) || (right < click_x) || (left > click_x)) {
            clicked = false;
        }
        return clicked;
    }
}
/*
function mouseOverText(text, font = 'Courier New', font_size = 12) {

    this.text = text;
    this.width = font_size * text.length;
    this.height = font_size * 2;

    this.changeText = function(new_text) {
        this.text = new_text;
        this.width = font_size * new_text.length;
        this.height = font_size * 2;
    }
    this.render = function(x, y) {

        ctx.fillStyle = 'lightgrey';
        ctx.fillRect(x, y, this.width, this.height);
        ctx.strokeStyle = 'grey';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, this.width, this.height);

        ctx.font = font_size + 'px' + font;
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.fillText(this.text, x+this.width/2, y+(this.height/21)*13);
    }
}*/