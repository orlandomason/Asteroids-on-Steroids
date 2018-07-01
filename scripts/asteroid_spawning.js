
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
        var iron = getRandomInt(15, 40);
        var magnesia = getRandomInt(20, 25);
        var silica = 83 - iron - magnesia;
        var other = Math.round((100 - ammonia - alumina - sulphur - graphite - iron - magnesia - silica) * 100) / 100;

        
        this.resources = {
            ammonia: ammonia,
            alumina: alumina,
            sulphur: sulphur,
            graphite: graphite,
            iron: iron,
            magnesia: magnesia,
            silica: silica,
            other: other
        }

        //this.text_box = new mouseOverText(this.x, this.y, "ammonia");

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

    var text = [];
    for (let [property, value] of Object.entries(this.resources)) {
        text.push(property+": "+value+"%");
    }
    var text_box = new mouseOverText(text);

    this.image = new Image();
    this.image.src = 'vesta.png';

    this.update = function() {

        this.zoomed_size = this.size * zoom;
        this.onscreen_x = this.x - camera_x - (this.zoomed_size / 2);
        this.onscreen_y = this.y - camera_y - (this.zoomed_size / 2);

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
            text_box.render(this.right, this.bottom);
        }
    }
}

function mouseOverText(text, font = 'Courier New', font_size = 14) {

    this.text = text;
    this.font_size = font_size;

    var longest_string = text.reduce((a, b) => a.length > b.length ? a : b, '');
    this.width = font_size * longest_string.length;

    this.height = font_size * text.length + font_size/2;

    this.changeText = function(new_text) {
        this.text = new_text;
        this.width = font_size * new_text.length;
        this.height = font_size * 2;
    }
    this.render = function(x, y) {
        
        ctx.fillStyle = '#cccccc';
        ctx.fillRect(x, y, this.width, this.height);
        ctx.strokeStyle = 'grey';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, this.width, this.height);

        ctx.font = font_size + 'px' + font;
        ctx.fillStyle = 'green'; // y+(i+1)*((this.font_size*2)/21)*13
        ctx.textAlign = 'right';

        for (var i = 0; i < this.text.length; i++) {
            ctx.fillText(this.text[i], x+this.width/2, y+this.font_size*(i+1));
        }
    }
}