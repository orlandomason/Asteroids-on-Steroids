// Weight is molar mass and density is g/cm3 (mostly at room temperature or when solid)
var crude_resources = {

iron: {name: "iron", type: "metal", goldschmidt_classification: "siderophile", density: 7.86},
pgm: {type: "platinum group metal", goldschmidt_classification: "siderophile", density: 16},

alumina: {type: "ore", goldschmidt_classification: "lithophile", density: 3.987},
magnesia: {type: "ore", goldschmidt_classification: "lithophile", density: 3.58},
silica: {type: "ore", goldschmidt_classification: "lithophile", density: 2.648},

ammonia: {type: "organic", goldschmidt_classification: "volatile", density: 8.17},
graphite: {type: "organic", goldschmidt_classification: "volatile", density: 2.266},
ice: {type: "organic", goldschmidt_classification: "volatile", density: 0.9340},
sulphur: {type: "organic", goldschmidt_classification: "chalcophile", density: 2},

};

var fuels = {
	methane: {liquid_density: 0.424, molecular_weight: 16.04},
	oxygen: {liquid_density: 1.141, molecular_weight: 16}
}

// Oxidizer Density: 1.140 g/cm3. Oxidizer Freezing Point: -219 deg C. Oxidizer Boiling Point: -183 deg C. Fuel Density: 0.424 g/cm3. Fuel Freezing Point: -184 deg C. Fuel Boiling Point: -162 deg C.
// Oxidizer Flow Rate	1.38 kg/s
// Fuel Flow Rate	0.63 kg/s
// mixture ratio 2.19
// Methane must be cooled below its critical temperature of -82.3 °C in order to be liquified under pressure.

/*
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
*/