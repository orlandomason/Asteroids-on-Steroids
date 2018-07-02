
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
        ctx.fillStyle = 'black';
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
}