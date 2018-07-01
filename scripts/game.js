function startGame() {
	canvas_1.start();

    document.getElementById('non_canvas_content').style.display ='none';
    document.getElementById('canvas_1').style.display ='block';
}

var canvas_1 = {

    context: document.getElementById('canvas_1').getContext("2d"),
    width: window.innerWidth,
    height: window.innerHeight,

    start : function() {
        document.body.insertBefore(document.getElementById('canvas_1'), document.body.childNodes[0]);
        this.interval = setInterval(updateGame, fps / 1000);


        // |---------------------------|
        // | Mouse and keyboard inputs |
        // |---------------------------|


        // On mouse move
        document.getElementById('canvas_1').addEventListener('mousemove', function (e) {

            this.mouse_x = e.pageX;
            this.mouse_y = e.pageY;

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

        canvas_1.keys = [];

        window.addEventListener('keydown', function (e) {
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

var update_count = 0;

function updateGame() {

    var t0 = performance.now();

    update_count++;

    ctx = canvas_1.context;

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

    camera_update();
    var t1 = performance.now();
    //if (update_count % (fps*10) == 0) { console.log(t1 - t0 + " milliseconds per frame"); }
}

var background = new Image(); 
background.src = 'seamless_space.png';
var background_width = 500;
var background_height = 500;

function render() {

    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    canvas_1.width = window.innerWidth;
    canvas_1.height = window.innerHeight;

    // Background //////////////////////////////////////

    for (var i = 0; i < canvas_1.width + background_width; i += background_width) {

        for (var j = 0; j < canvas_1.height + background_height; j += background_height) {

            var bpx = i - Math.round((camera_x / 10) % 500);
            var bpy = j - Math.round((camera_y / 10) % 500);

            ctx.drawImage(background, bpx, bpy, background_width, background_height);
        }
    }
    /////////////////////////////////////////////////////

    for (var i = 0; i < asteroids.length; i++) {
        asteroids[i].update();
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