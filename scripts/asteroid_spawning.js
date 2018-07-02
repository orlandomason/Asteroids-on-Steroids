function asteroid(type, size, pos_x, pos_y) {

    this.type = type;
    this.size = size;
    this.x = pos_x;
    this.y = pos_y;

    if (type == "c-type") {

        var ammonia = Math.round(Math.pow(Math.random(), 2)*100)/100; // Exponential curve up to 1, rounded to 2dp 
        var alumina = getRandomFloat(2, 3, 1);
        var sulphur = getRandomFloat(1, 6, 1);
        var graphite = getRandomFloat(1, 7, 1);

        var ice = getRandomInt(3, 18);

        var iron = getRandomInt(15, 40);
        var magnesia = getRandomInt(20, 25);
        var silica = 83 - iron - magnesia - ice;
        var other = Math.round((100 - ammonia - alumina - sulphur - graphite - iron - magnesia - silica) * 100) / 100;

        this.resources = [
            // Metal ores
            {text: "iron", resource: crude_resources.iron, percentage: iron},
            {text: "alumina", resource: crude_resources.alumina, percentage: alumina},
            // Rock/lithophiles
            {text: "magnesia", resource: crude_resources.magnesia, percentage: magnesia},
            {text: "silica", resource: crude_resources.silica, percentage: silica},
            // Volatiles/Organics
            {text: "ammonia", resource: crude_resources.ammonia, percentage: ammonia},
            {text: "graphite", resource: crude_resources.graphite, percentage: graphite},
            {text: "ice", resource: crude_resources.ice, percentage: ice},
            {text: "sulphur", resource: crude_resources.sulphur, percentage: sulphur}
        ];

        // Cubic metres
        let volume = 4/3 * Math.PI * Math.pow(this.size/2, 3);
        // Cubic centimetres
        volume = volume / 1000000;
        // Calculate tonnage of each resource
        for (var i = 0; i < this.resources.length; i++) {
            let grams = this.resources[i].resource.density * (volume * this.resources[i].percentage / 100);
            this.resources[i].amount = grams * 1000000;
        }
        // Getting a random integer between two values, inclusive  -->  Math.floor(Math.random() * (max - min + 1)) + min;

        // Silica 25% - 40%
        // Magnesia 20% - 25%  (from forsterite)
        // Ferrous oxide 10% - 22%  (from fayalite an)
        // Iron 6% - 19%
        // Graphite 1% - 7%
        // Sulphur 1% - 6%
        // Alumina 2% - 3%
        
        // Ammonia 0% - 1%

        // Math.round(Math.pow(Math.random(), 2)*100)/100; 
        // Exponential curve up to 1, rounded to 2dp


        // Phosphorus (P2O5) 0% - 0.4%
        // Potassium (K2O) 0% - 0.1%
    }

    /*for (let [property, value] of Object.entries(this.resources)) {
        text.push({resource: property, percentage: value, text: property+": "+value+"%"});
    }*/

    /*text.sort(function (a, b) {
        return b.percentage - a.percentage;
    });*/


    //let resource_text = new mouseOverText(this.resources);


    this.image = new Image();
    this.image.src = 'vesta.png';

    this.update = function() {

        this.zoomed_size = this.size * zoom;

        this.onscreen_x = this.x*zoom - camera_x*zoom - (this.zoomed_size / 2);
        this.onscreen_y = this.y*zoom - camera_y*zoom - (this.zoomed_size / 2);
        //this.onscreen_x = this.x - camera_x - (this.zoomed_size / 2);
        //this.onscreen_y = this.y - camera_y - (this.zoomed_size / 2);

        this.left = this.onscreen_x;
        this.right = this.onscreen_x + this.zoomed_size;
        this.top = this.onscreen_y;
        this.bottom = this.onscreen_y + this.zoomed_size;

        this.render();
        this.mouseOver();
    }
        
    this.render = function() {

        ctx.drawImage(this.image, this.onscreen_x, this.onscreen_y, this.zoomed_size, this.zoomed_size);
    }

    let scanned = false;
    let button = new standardButton("scan");

    this.mouseOver = function() {
        if (scanned == false) {
            if ((this.bottom+button.height > canvas_1.mouse_y) && (this.top < canvas_1.mouse_y) && (this.right+button.width > canvas_1.mouse_x) && (this.left < canvas_1.mouse_x)) {
                button.render(this.left, this.bottom);
                if (button.clicked()) { scanned = true; }
            }
        }

        if ((this.bottom > canvas_1.mouse_y) && (this.top < canvas_1.mouse_y) && (this.right > canvas_1.mouse_x) && (this.left < canvas_1.mouse_x)) {
            if (scanned) {
                ctx.font = "14px Courier New bold";
                ctx.textAlign = 'right';

                for (var i = 0; i < this.resources.length; i++) {
                
                    switch (this.resources[i].text) {
                        case "iron":
                            ctx.fillStyle = 'rgb(156, 25, 19)';
                            break;
                        case "alumina":
                            ctx.fillStyle = 'rgb(180, 180, 180)';
                            break;
                        case "magnesia":
                            ctx.fillStyle = 'rgb(153, 153, 153)';
                            break;
                        case "silica":
                            ctx.fillStyle = 'rgb(172, 148, 83)';
                            break;
                        case "graphite":
                            ctx.fillStyle = 'rgb(77, 70, 51)';
                            break;
                        case "sulphur":
                            ctx.fillStyle = 'rgb(217, 217, 50)';
                            break;
                        case "ammonia":
                            ctx.fillStyle = 'rgb(100, 180, 148)';
                            break;
                        default:
                            ctx.fillStyle = 'rgb(255, 255, 255)';
                    }

                    let text = this.resources[i].text + ": " + this.resources[i].percentage + "%";
                    ctx.fillText(text, this.right, this.bottom + 20*(i+1));
                }
            }
        }
    }
}