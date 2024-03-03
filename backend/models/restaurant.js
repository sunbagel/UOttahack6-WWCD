import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true
        },
        coordinates: {
          type: [Number],
          required: true,
          index: '2dsphere' // Create a special 2dsphere index on `coordinates`
        }
    },
    ingredients: {
        dairy: {
            milk: { type: Number, default: 0 },
            cheese: { type: Number, default: 0 },
            yogurt: { type: Number, default: 0 },
        },
        fruits: {
            apples: { type: Number, default: 0 },
            bananas: { type: Number, default: 0 },
            oranges: { type: Number, default: 0 },
        },
        vegetables: {
            potatoes: { type: Number, default: 0 },
            carrots: { type: Number, default: 0 },
            tomatoes: { type: Number, default: 0 },
            onions: { type: Number, default: 0 },
        },
        meats: {
            chickenBreasts: { type: Number, default: 0 },
            groundBeef: { type: Number, default: 0 },
            porkLoin: { type: Number, default: 0 },
        },
        bakery: {
            bread: { type: Number, default: 0 },
            pastries: { type: Number, default: 0 },
            pies: { type: Number, default: 0 },
        },
        grains: {
            rice: { type: Number, default: 0 },
            pasta: { type: Number, default: 0 },
            cereal: { type: Number, default: 0 },
        },
    }
        
})


const Restaurant = mongoose.model("Restaurant", restaurantSchema)

export default Restaurant;




