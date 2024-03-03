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
    }
});

const Driver = mongoose.Model("Driver", driverSchema)

export default Driver