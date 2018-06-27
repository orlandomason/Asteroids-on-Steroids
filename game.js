function startGame() {
	canvas_1.start();
}

var canvas_1 = {
    start : function() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.context = document.getElementById('canvas_1').getContext("2d");
        document.body.insertBefore(document.getElementById('canvas_1'), document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGame, 100);


        // |---------------------------|
        // | Mouse and keyboard inputs |
        // |---------------------------|


        // On mouse move
        document.getElementById('canvas_1').addEventListener('mousemove', function (e) {

            canvas_1.mouse_x = e.pageX;
            canvas_1.mouse_y = e.pageY;

        })

        // Prevent context menu popping up on right click
        document.getElementById('canvas_1').addEventListener('contextmenu', function (e) {
            window.event.preventDefault();
            return false;
        }, false);

        // Left click
        document.getElementById('canvas_1').addEventListener('mousedown', function (e) {

            // Left click
            if (e.button == 0) {
                canvas_1.left_click_x = e.pageX;
                canvas_1.left_click_y = e.pageY;
            } 
            // Midle click
            else if (e.button == 1) {
                canvas_1.middle_click_x = e.pageX;
                canvas_1.middle_click_y = e.pageY;
            }
            // Right click
            else if (e.button == 2) {
                canvas_1.right_click_x = e.pageX;
                canvas_1.right_click_y = e.pageY;
            }
        })

        document.getElementById('canvas_1').addEventListener('mouseup', function (e) {
            // Left click
            if (e.button == 0) {
                canvas_1.left_click_x = false;
                canvas_1.left_click_y = false;
            } 
            // Middle click
            else if (e.button == 1) {
                canvas_1.middle_click_x = false;
                canvas_1.middle_click_y = false;
            }
            // Right click
            else if (e.button == 2) {
                canvas_1.right_click_x = false;
                canvas_1.right_click_y = false;
            }
        })

        //
        window.addEventListener('keydown', function (e) {
            canvas_1.keys = (canvas_1.keys || []);
            canvas_1.keys[e.keyCode] = true;
        })
        window.addEventListener('keyup', function (e) {
            canvas_1.keys[e.keyCode] = false; 
        })
    },
    clear : function() {
        this.context.clearRect(0, 0, this.width, this.height);
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Global variables
var zoom = 1;
var offset_x = 0;
var offset_y = 0;
var camera_x = 0;
var camera_y = 0;

var game_objects = [];
var temporary_objects = [];

// build_mode variables
var build_mode = false;
var grid_points = [];
var build_mode_objects = [];
var build_mode_buttons = [];


// updateGame variables
var left_mouse_down = false;
var last_left_click_x;
var last_left_click_y;
var middle_mouse_down = false;
var last_middle_click_x;
var last_middle_click_y;
var right_mouse_down = false;
var last_right_click_x;
var last_right_click_y;

var count_left_clicks = false;
var begin_drawing = false;
var left_click_count = 0;
var left_clicks = [];


function updateGame() {
    canvas_1.clear();
    render();
    // Mouse and keyboard inputs 

    // For something which activates on a single click you have to put it in the else statement.
    // Otherwise it will continuously be activated as long as the mouse button is down.
    // mouse_is_down is set to true to detect that it has been clicked and set back to false when the mouse button is lifted.

    // Left mouse button is down
    if (canvas_1.left_click_x && canvas_1.left_click_y) {

        last_left_click_x = canvas_1.left_click_x;
        last_left_click_y = canvas_1.left_click_y;
        left_mouse_down = true;
    }

    // Left mouse button is up
    else {

        if (left_mouse_down) {

            if (count_left_clicks) {

                left_clicks.push({x: last_left_click_x, y: last_left_click_y});
                left_click_count++;
            }
            else {

                left_clicks = [];
                left_click_count = 0;
            }

            // Buttons
            for (var i = 0; i < build_mode_buttons.length; i++) {

                if (build_mode_buttons[i].clicked(last_left_click_x, last_left_click_y)) {
                }            
            }

            left_mouse_down = false;
        }
    }


    // Middle mouse button is down
    if (canvas_1.middle_click_x && canvas_1.middle_click_y) {

        middle_mouse_down = true;
    }

    // Middle mouse button is up
    else {

        middle_mouse_down = false;
    }


    // Right mouse button is down
    if (canvas_1.right_click_x && canvas_1.right_click_y) {

        right_mouse_down = true;
    }

    // Right mouse button is up
    else {

        right_mouse_down = false;
    }


    // Zoom
    if (canvas_1.keys[107] && zoom < 2) { 

        var ax = canvas_1.mouse_x / zoom + offset_x / zoom;
        var ay = canvas_1.mouse_y / zoom + offset_y / zoom;

        console.log(canvas_1.mouse_x / zoom + offset_x / zoom);

        zoom += 0.1;

        offset_x = ax * (zoom - 1);
        offset_y = ay * (zoom - 1);
    }

    if (canvas_1.keys[109] && zoom > 1) {

        var ax = canvas_1.mouse_x / zoom + offset_x / zoom; // This does not seem to be the problem
        var ay = canvas_1.mouse_y / zoom + offset_y / zoom; // or at least it gives an accurate answer

        console.log(canvas_1.mouse_x / zoom + offset_x / zoom);

        zoom -= 0.1; // I've tried moving this to the start and to the end, it only works properly here

        offset_x = ax * (zoom - 1); // I think the problem lies here in the zoom part, or something is missing
        offset_y = ay * (zoom - 1); // The problem also occurs when moving the mouse around when you zoom in
    }

    // left right up down
    if (canvas_1.keys[37]) { camera_x--; }
    if (canvas_1.keys[39]) { camera_x++; }
    if (canvas_1.keys[38]) { camera_y--; }
    if (canvas_1.keys[40]) { camera_y++; }

}

var background = new Image(); 
background.src = 'seamless_space_dot.png';

function render() {

	ctx = canvas_1.context;
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    canvas_1.width = window.innerWidth;
    canvas_1.height = window.innerHeight;

    // Background ///////////////////////////////////////

    // canvas_1.mouse_x

    var background_width = 500 * zoom;
    var background_height = 500 * zoom;

    for (var i = 0; i < canvas_1.width + background_width; i += background_width) {

        for (var j = 0; j < canvas_1.height + background_height; j += background_height) {

            var bpx = i - offset_x;
            var bpy = j - offset_y;

            ctx.drawImage(background, bpx, bpy, background_width, background_height);
        }
    }    
}

function drawShape(arr, close_path = false, color = 'lightgrey', border_width = 0, border_color = 'black') {

    var border = border_width*(Math.ceil(zoom/10));



	this.render = function() {
		
        ctx.beginPath();
		ctx.moveTo(arr[0].x, arr[0].y);
		
        for (var i = 1; i < arr.length; i++) {

			ctx.lineTo(arr[i].x, arr[i].y);
		}

        if (close_path) {

            ctx.closePath();
            ctx.lineWidth = border;
            ctx.strokeStyle = border_color;
            ctx.stroke();
            ctx.fillStyle = color;
            ctx.fill();
        } 

        else {

            if (border_width > 0) {
                ctx.lineWidth = border;
            } else { ctx.lineWidth = 1; }

            ctx.strokeStyle = border_color;
            ctx.stroke();
        }
	}
}

/*this.image = new image();
this.image.src = 'rocket.png';

this.render = function() {

    var a = this.x;
    var b = this.y;
    //var angle = this.rotation;

    //var x = a + radius * Math.cos(angle);
    //var y = b + radius * Math.sin(angle);
    //ctx.rotate(angle*Math.PI/180);
    ctx.drawImage(this.image, a, b);
}*/

