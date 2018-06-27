
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
    this.x = pos_x;
    this.y = pos_y;

    if (type == "c-type") {

        var ammonia = Math.round(Math.pow(Math.random(), 2)*100)/100; // Exponential curve up to 1, rounded to 2dp 
        var alumina = getRandomFloat(2, 3, 1);
        var sulphur = getRandomFloat(1, 6, 1);
        var graphite = getRandomFloat(1, 7, 1);
        var iron = getRandomInt(15, 40);
        var magnesia = getRandomInt(20, 25);
        var silica = 100 - ammonia + alumina + sulphur + graphite + iron + magnesia;

        
        this.resources = {
            ammonia: ammonia,
            alumina: alumina,
            sulphur: sulphur,
            graphite: graphite,
            iron: iron,
            magnesia: magnesia,
            silica: silica
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


    this.image = new Image();
    this.image.src = 'vesta.png';
        
    this.render = function() {


    }
}
