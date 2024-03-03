import mongoose from 'mongoose';

const driverSchema = new mongoose.Schema({
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
    delivery : {
      restaurantName : String,
      kitchenName : String,
      restaurantLocation: {
        type: [Number],
        index: '2dsphere'
      },
      kitchenLocation: {
        type: [Number],
        index: '2dsphere' // Create a special 2dsphere index on `coordinates`
      },
      item : String,
      itemQuantity : Number
    }
});

const Driver = mongoose.model("Driver", driverSchema)

export default Driver