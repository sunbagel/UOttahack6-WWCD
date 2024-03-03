import mongoose from 'mongoose';

const soupKitchenSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    chickenWings: {
        type: Number,
        required: true,
    },
    oil: {
        type: Number,
        required: true,
    },
    salt: {
        type: Number,
        required: true,
    },
    blackPepper: {
        type: Number,
        required: true,
    },
    onion: {
        type: Number,
        required: true,
    },
    honey: {
        type: Number,
        required: true,
    },
    milk: {
        type: Number,
        required: true,
    },
    cheerios: {
        type: Number,
        required: true,
    },
    flour: {
        type: Number,
        required: true,
    },
    sugar: {
        type: Number,
        required: true,
    },
    pepper: {
        type: Number,
        required: true,
    },
    oliveOil: {
        type: Number,
        required: true,
    },
    butter: {
        type: Number,
        required: true,
    },
    eggs: {
        type: Number,
        required: true,
    },
    bakingPowder: {
        type: Number,
        required: true,
    },
    bakingSoda: {
        type: Number,
        required: true,
    },
    vanillaExtract: {
        type: Number,
        required: true,
    },
    soySauce: {
        type: Number,
        required: true,
    },
    vinegarWhite: {
        type: Number,
        required: true,
    },
    mustard: {
        type: Number,
        required: true,
    },
    ketchup: {
        type: Number,
        required: true,
    },
    mayonnaise: {
        type: Number,
        required: true,
    },
    garlic: {
        type: Number,
        required: true,
    },
    onions: {
        type: Number,
        required: true,
    },
    tomatoSaucePaste: {
        type: Number,
        required: true,
    },
    rice: {
        type: Number,
        required: true,
    },
    pasta: {
        type: Number,
        required: true,
    },
    cannedBeans: {
        type: Number,
        required: true,
    },
    quinoa: {
        type: Number,
        required: true,
    },
    lentils: {
        type: Number,
        required: true,
    },
    chickenBroth: {
        type: Number,
        required: true,
    },
    beefBroth: {
        type: Number,
        required: true,
    },
    cumin: {
        type: Number,
        required: true,
    },
    coriander: {
        type: Number,
        required: true,
    },
    paprika: {
        type: Number,
        required: true,
    },
    cinnamon: {
        type: Number,
        required: true,
    },
    basil: {
        type: Number,
        required: true,
    },
    oregano: {
        type: Number,
        required: true,
    },
    thyme: {
        type: Number,
        required: true,
    },
    stockCubesBouillon: {
        type: Number,
        required: true,
    },
    nuts: {
        type: Number,
        required: true,
    },
    cereal: {
        type: Number,
        required: true,
    },
    mapleSyrup: {
        type: Number,
        required: true,
    },
    peanutButter: {
        type: Number,
        required: true,
    },
    sourCream: {
        type: Number,
        required: true,
    },
    yogurt: {
        type: Number,
        required: true,
    },
    cheese: {
        type: Number,
        required: true,
    },
    blueberry: {
        type: Number,
        required: true,
    },
    strawberry: {
        type: Number,
        required: true,
    },
    lettuce: {
        type: Number,
        required: true,
    },
});

const SoupKitchen = mongoose.model("SoupKitchen", soupKitchenSchema)

export default SoupKitchen;
