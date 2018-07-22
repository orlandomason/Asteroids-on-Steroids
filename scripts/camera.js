var fps = 50;

var zoom = 1;
var max_zoom = 2;
var min_zoom = 1000 / map_height * map_ratio;
var zoom_speed = 0.01;
var zoom_rate = zoom/zoom_speed;
var offset_x = 0;
var offset_y = 0;

var camera_x = map_width / 2;
var camera_y = map_height / 2;
var camera_speed = Math.ceil(50 / fps);
var camera_speed_i = camera_speed;
var camera_speed_max = camera_speed * 8;
var camera_speed_ir = 5 * fps; // Increment rate
var akd = false; // Arrow key down

var scx = camera_x;
var scy = camera_y;

function camera_update() {

    var max_camera_x = map_width - canvas_1.width / zoom;
    var max_camera_y = map_height - canvas_1.height / zoom;

	// Zoom
    min_zoom = canvas_1.height / map_height * map_ratio;
    zoom
    zoom_rate = zoom*zoom_speed;

    if (canvas_1.keys[107] && zoom < max_zoom) { 

        if (camera_x < max_camera_x && camera_y < max_camera_y) {
            camera_x += zoom_speed * canvas_1.width / 2 / zoom;
            camera_y += zoom_speed * canvas_1.height / 2 / zoom;
        }
        zoom += zoom_rate;
    }

    if (canvas_1.keys[109] && zoom > min_zoom) {

        if (camera_x > 0 && camera_y > 0 ) {
            camera_x -= zoom_speed * canvas_1.width / 2 / zoom;
            camera_y -= zoom_speed * canvas_1.height / 2 / zoom;
        }
        zoom -= zoom_rate;
    }

    // Mouse Wheel
    if (mw < 0 && zoom < max_zoom) { 

        if (camera_x < max_camera_x && camera_y < max_camera_y) {
            camera_x += zoom_speed * canvas_1.width / 2 / zoom;
            camera_y += zoom_speed * canvas_1.height / 2 / zoom;
        }
        zoom += zoom_rate;
    }

    if (mw > 0 && zoom > min_zoom) {

        if (camera_x > 0 && camera_y > 0 ) {
            camera_x -= zoom_speed * canvas_1.width / 2 / zoom;
            camera_y -= zoom_speed * canvas_1.height / 2 / zoom;
        }
        zoom -= zoom_rate;
    }

    // Arrow keys: left right up down
    if (canvas_1.keys[37]) { 
        if (camera_x > 0) { camera_x -= camera_speed_i; akd = true; } 
    } 
    if (canvas_1.keys[39]) { 
       if (camera_x < max_camera_x) { camera_x += camera_speed_i; akd = true; }
    }
    if (canvas_1.keys[38]) { 
        if (camera_y > 0) { camera_y -= camera_speed_i; akd = true; }
    }
    if (canvas_1.keys[40]) { 
        if (camera_y < max_camera_y) { camera_y += camera_speed_i; akd = true; }
    }

    // If any arrow key is pressed
    if (akd) {
        if (update_count % camera_speed_ir == 0) {
            camera_speed_i = incrementNumber(camera_speed_i, 1, camera_speed_max);
        }
        akd = false;
    }
    else { 
        camera_speed_i = camera_speed; 
    }


    // Middle mouse button for movement
    if (mmbd) {
        camera_x = scx + mmbdx - mouse_x;
        camera_y = scy + mmbdy - mouse_y;

        console.log(scy + mmbdy - mouse_y);
    }
    else {
        // This gives the starting camera position before mmb is clicked
        scx = camera_x;
        scy = camera_y;
    }
}