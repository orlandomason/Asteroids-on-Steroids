
// Weight is molar mass and density is g/cm3 (mostly at room temperature or when solid)
function resource(name, weight, density, chemical_formula = "n/a") {
    this.name = name;
    this.weight = weight;
    this.density = density;
    this.chemical_formula = chemical_formula;
}
/*
var materials = [

new material("platinum group metals", 150, 16),
new material("graphite", 12.011, 2.266, "C"),
new material("silica", 60.08, 2.648, "SiO2"),
new material("alumina", 101.96, 3.987, "Al2O3"),
new material("ferrous oxide", 71.844, 5.74, "FeO"),
new material("magnesia", 40.3044, 3.58, "MgO"),

// Volatiles
new material("water ice", 18.01528, 0.9340, "H2O"), 
new material("phosphorus", 283.886, 2.39, "P2O5"),
new material("potassium", 94.2, 2.35, "K2O"),
new material("sulfur", 32.065, 2, "S"),
new material("ammonia", 17.031, 8.17, "NH3"),
];
*/
var resources = {

iron: new resource("iron", 55.845, 7.86, "Fe"),
// ferrous_oxide: new resource("ferrous oxide", 71.844, 5.74, "FeO"),
pgm: new resource("platinum group metals", 150, 16),
graphite: new resource("graphite", 12.011, 2.266, "C"),
silica: new resource("silica", 60.08, 2.648, "SiO2"),
alumina: new resource("alumina", 101.96, 3.987, "Al2O3"),
magnesia: new resource("magnesia", 40.3044, 3.58, "MgO"),

// Volatiles
H2O: new resource("water ice", 18.01528, 0.9340, "H2O"), 
phosphorus: new resource("phosphorus", 283.886, 2.39, "P2O5"),
potassium: new resource("potassium", 94.2, 2.35, "K2O"),
sulphur: new resource("sulphur", 32.065, 2, "S"),
ammonia: new resource("ammonia", 17.031, 8.17, "NH3")
};

//{resource: iron, type: metal, goldschmidt_classification: siderophile}


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

    this.mouseOver = function() {

        if ((this.bottom > canvas_1.mouse_y) && (this.top < canvas_1.mouse_y) && (this.right > canvas_1.mouse_x) && (this.left < canvas_1.mouse_x)) {
            //resource_text.render(this.right, this.bottom);
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


/*
function mouseOverText(text, font = 'Courier New', font_size = 14) {

    this.text = text;
    this.font_size = font_size;

    var longest_string = text.reduce((a, b) => a.length > b.length ? a : b, '');
    this.width = font_size * longest_string.length / 2;
    this.height = font_size * text.length + font_size/2;

    this.render = function(x, y) {
        /*
        ctx.fillStyle = '#cccccc';
        ctx.fillRect(x, y, this.width, this.height);
        ctx.strokeStyle = 'grey';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, this.width, this.height);
        *//*
        ctx.font = this.font_size + 'px ' + font + " bold";
        ctx.fillStyle = 'green'; // y+(i+1)*((this.font_size*2)/21)*13
        ctx.textAlign = 'right';

        for (var i = 0; i < this.text.length; i++) {
            /*
            switch (this.text[i].resource) {
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
            }*//*

            ctx.fillText(this.text[i].text, x, y+this.font_size*(i+1)*1.2);
        }
    }
}*/