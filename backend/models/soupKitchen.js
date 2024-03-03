import mongoose from 'mongoose';

const soupKitchenSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    chickenWings: {
        type: Number,
        required: true,
        default: 0
    },
    oil: {
        type: Number,
        required: true,
        default: 0
    },
    salt: {
        type: Number,
        required: true,
        default: 0
    },
    blackPepper: {
        type: Number,
        required: true,
        default: 0
    },
    onion: {
        type: Number,
        required: true,
        default: 0
    },
    honey: {
        type: Number,
        required: true,
        default: 0
    },
    milk: {
        type: Number,
        required: true,
        default: 0
    },
    cheerios: {
        type: Number,
        required: true,
        default: 0
    },
    flour: {
        type: Number,
        required: true,
        default: 0
    },
    sugar: {
        type: Number,
        required: true,
        default: 0
    },
    pepper: {
        type: Number,
        required: true,
        default: 0
    },
    oliveOil: {
        type: Number,
        required: true,
        default: 0
    },
    butter: {
        type: Number,
        required: true,
        default: 0
    },
    eggs: {
        type: Number,
        required: true,
        default: 0
    },
    bakingPowder: {
        type: Number,
        required: true,
        default: 0
    },
    bakingSoda: {
        type: Number,
        required: true,
        default: 0
    },
    vanillaExtract: {
        type: Number,
        required: true,
        default: 0
    },
    soySauce: {
        type: Number,
        required: true,
        default: 0
    },
    vinegarWhite: {
        type: Number,
        required: true,
        default: 0
    },
    mustard: {
        type: Number,
        required: true,
        default: 0
    },
    ketchup: {
        type: Number,
        required: true,
        default: 0
    },
    mayonnaise: {
        type: Number,
        required: true,
        default: 0
    },
    garlic: {
        type: Number,
        required: true,
        default: 0
    },
    onions: {
        type: Number,
        required: true,
        default: 0
    },
    tomatoSaucePaste: {
        type: Number,
        required: true,
        default: 0
    },
    rice: {
        type: Number,
        required: true,
        default: 0
    },
    pasta: {
        type: Number,
        required: true,
        default: 0
    },
    cannedBeans: {
        type: Number,
        required: true,
        default: 0
    },
    quinoa: {
        type: Number,
        required: true,
        default: 0
    },
    lentils: {
        type: Number,
        required: true,
        default: 0
    },
    chickenBroth: {
        type: Number,
        required: true,
        default: 0
    },
    beefBroth: {
        type: Number,
        required: true,
        default: 0
    },
    cumin: {
        type: Number,
        required: true,
        default: 0
    },
    coriander: {
        type: Number,
        required: true,
        default: 0
    },
    paprika: {
        type: Number,
        required: true,
        default: 0
    },
    cinnamon: {
        type: Number,
        required: true,
        default: 0
    },
    basil: {
        type: Number,
        required: true,
        default: 0
    },
    oregano: {
        type: Number,
        required: true,
        default: 0
    },
    thyme: {
        type: Number,
        required: true,
        default: 0
    },
    stockCubesBouillon: {
        type: Number,
        required: true,
        default: 0
    },
    nuts: {
        type: Number,
        required: true,
        default: 0
    },
    cereal: {
        type: Number,
        required: true,
        default: 0
    },
    mapleSyrup: {
        type: Number,
        required: true,
        default: 0
    },
    peanutButter: {
        type: Number,
        required: true,
        default: 0
    },
    sourCream: {
        type: Number,
        required: true,
        default: 0
    },
    yogurt: {
        type: Number,
        required: true,
        default: 0
    },
    cheese: {
        type: Number,
        required: true,
        default: 0
    },
    blueberry: {
        type: Number,
        required: true,
        default: 0
    },
    strawberry: {
        type: Number,
        required: true,
        default: 0
    },
    lettuce: {
        type: Number,
        required: true,
        default: 0
    },
});

const SoupKitchen = mongoose.model("SoupKitchen", soupKitchenSchema)

export default SoupKitchen;
