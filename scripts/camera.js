var fps = 20;

var zoom = 1;
var offset_x = 0;
var offset_y = 0;

var camera_x = map_width / 2;
var camera_y = map_height / 2;
var camera_speed = Math.round(20 / fps);
var camera_speed_i = camera_speed;
var camera_speed_max = camera_speed * 8;
var camera_speed_ir = 5 * fps; // Increment rate
var akd = false; // Arrow key down

function camera_update() {

	// Zoom
    if (canvas_1.keys[107] && zoom < 2) { 

        //var ax = canvas_1.mouse_x / zoom + offset_x / zoom;
        //var ay = canvas_1.mouse_y / zoom + offset_y / zoom;

        zoom += 0.01;

        //offset_x = ax * (zoom - 1);
        //offset_y = ay * (zoom - 1);
    }

    if (canvas_1.keys[109] && zoom > 1) {

        //var ax = canvas_1.mouse_x / zoom + offset_x / zoom; // This does not seem to be the problem
        //var ay = canvas_1.mouse_y / zoom + offset_y / zoom; // or at least it gives an accurate answer

        zoom -= 0.01; // I've tried moving this to the start and to the end, it only works properly here

        //offset_x = ax * (zoom - 1); // I think the problem lies here in the zoom part, or something is missing
        //offset_y = ay * (zoom - 1); // The problem also occurs when moving the mouse around when you zoom in
    }


    // Movement
	var max_camera_x = map_width - canvas_1.width / zoom;
    var max_camera_y = map_height - canvas_1.height / zoom;

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
}