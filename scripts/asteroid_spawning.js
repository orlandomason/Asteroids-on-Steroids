
var scans_left = 3;

function asteroid(type, size, pos_x, pos_y) {

    this.type = type;
    this.size = size;
    this.x = pos_x;
    this.y = pos_y;
    let select = false;
    let centre_x;
    let centre_y;

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
            {text: "iron", resource: crude_resources.iron, percentage: iron, colour: 'rgb(156, 25, 19)'},
            {text: "alumina", resource: crude_resources.alumina, percentage: alumina, colour: 'rgb(204, 204, 204)'},
            // Rock/lithophiles
            {text: "magnesia", resource: crude_resources.magnesia, percentage: magnesia, colour: 'rgb(153, 153, 153)'},
            {text: "silica", resource: crude_resources.silica, percentage: silica, colour: 'rgb(172, 148, 83)'},
            // Volatiles/Organics
            {text: "graphite", resource: crude_resources.graphite, percentage: graphite, colour: 'rgb(77, 70, 51)'},
            {text: "ammonia", resource: crude_resources.ammonia, percentage: ammonia, colour: 'rgb(46, 184, 80)'},
            {text: "ice", resource: crude_resources.ice, percentage: ice, colour: 'rgb(0, 102, 255)'},
            {text: "sulphur", resource: crude_resources.sulphur, percentage: sulphur, colour: 'rgb(217, 217, 50)'}
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

        // Silica 25% - 40%
        // Magnesia 20% - 25%  (from forsterite)
        // Ferrous oxide 10% - 22%  (from fayalite an)
        // Iron 6% - 19%
        // Graphite 1% - 7%
        // Sulphur 1% - 6%
        // Alumina 2% - 3%
        // Phosphorus (P2O5) 0% - 0.4%
        // Potassium (K2O) 0% - 0.1%
    }


    this.image = new Image();
    this.image.src = 'vesta.png';

    let scanned = false;
    let button = new standardButton(["Scan", "Colonise"], this.size);
    let text;

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

        centre_x = this.onscreen_x + this.zoomed_size/2;
        centre_y = this.onscreen_y + this.zoomed_size/2;

        this.render();
        this.mouseOver();

        if (lmbu) {
            select = leftClick(this.left, this.top, this.right, this.bottom + button.height);
        }
        if (select) {
            this.select();
        }
    }
        
    this.render = function() {

        ctx.drawImage(this.image, this.onscreen_x, this.onscreen_y, this.zoomed_size, this.zoomed_size);
    }

    this.mouseOver = function() {

        /*if (mouseOver(this.left, this.top, this.right, this.bottom)) {
            
            if (scanned) {
                ctx.font = "14px Trebuchet MS";
                ctx.textAlign = 'right';

                for (var i = 0; i < this.resources.length; i++) {
                
                    ctx.fillStyle = this.resources[i].colour;
                    text = this.resources[i].text + ": " + this.resources[i].percentage + "%";
                    ctx.fillText(text, this.left, this.top + 20*(i+1));
                }
            }

            else {

                ctx.textAlign = 'middle';
                for (var i = 0; i < this.resources.length; i++) {
                    
                    ctx.fillStyle = this.resources[i].colour;

                    /*switch (this.resources[i].text) {
                        case "iron":
                            text = this.resources[i].text + ": 15%-40%";
                            ctx.fillText(text, this.right, this.bottom + 20*(i+3));
                            break;
                        case "alumina":
                            break;
                        case "magnesia":
                            break;
                        case "silica":
                            break;
                        case "graphite":
                            break;
                        case "sulphur":
                            break;
                        case "ammonia":
                            break;
                        default:
                    }
                }
            }
        }*/
    }

    this.select = function() {

        button.render(this.left, Math.round(this.bottom+1));
        if (!scanned) {
            if (button.clicked() == 1) { scanned = true; scans_left--; }
        }
        if (button.clicked() == 2) { this.colonise(); }
        
        if (scanned) {
            ctx.font = "14px Trebuchet MS";
            ctx.textAlign = 'right';

            for (var i = 0; i < this.resources.length; i++) {
            
                ctx.fillStyle = this.resources[i].colour;
                text = this.resources[i].text + ": " + this.resources[i].percentage + "%";
                ctx.fillText(text, this.left-8, this.top + 20*(i+1));
            }
        }

        /*let grd = ctx.createLinearGradient(this.left, this.top, this.left, this.bottom);
        grd.addColorStop(0, "black");
        grd.addColorStop(0.5, "white");
        grd.addColorStop(1, "black");
        ctx.strokeStyle = grd;
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.arc(centre_x, centre_y, this.zoomed_size/2, 0, 2*Math.PI);
        ctx.stroke();*/
    }
}