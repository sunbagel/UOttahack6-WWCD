import { MongoClient, ServerApiVersion } from 'mongodb';
import express from 'express';
import mongoose from 'mongoose';

import SoupKitchen from './models/soupKitchen.js';

const uri = "mongodb+srv://admin:soup@wwcd.bzatisb.mongodb.net/?retryWrites=true&w=majority&appName=wwcd";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
const app = express();
const port = 3000;


mongoose.connect(uri)
    .then(() => app.listen (port, () =>  console.log('server is running')))
    .catch((error )=> console.log(error.message))

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post("/addSoupKitchen", async (req, res) => {
    console.log(req.body);
    const newSoupKitchen = new SoupKitchen({
        "name": "Sample Soup Kitchen",
        "chickenWings": 5,
        "oil": 2,
        "salt": 1,
        "blackPepper": 1,
        "onion": 2,
        "honey": 1,
        "milk": 3,
        "cheerios": 2,
        "flour": 4,
        "sugar": 2,
        "pepper": 1,
        "oliveOil": 3,
        "butter": 2,
        "eggs": 6,
        "bakingPowder": 1,
        "bakingSoda": 1,
        "vanillaExtract": 1,
        "soySauce": 2,
        "vinegarWhite": 1,
        "mustard": 1,
        "ketchup": 2,
        "mayonnaise": 2,
        "garlic": 3,
        "onions": 2,
        "tomatoSaucePaste": 3,
        "rice": 5,
        "pasta": 3,
        "cannedBeans": 2,
        "quinoa": 1,
        "lentils": 1,
        "chickenBroth": 4,
        "beefBroth": 3,
        "cumin": 1,
        "coriander": 1,
        "paprika": 1,
        "cinnamon": 1,
        "basil": 1,
        "oregano": 1,
        "thyme": 1,
        "stockCubesBouillon": 2,
        "nuts": 1,
        "cereal": 3,
        "mapleSyrup": 1,
        "peanutButter": 2,
        "sourCream": 2,
        "yogurt": 3,
        "cheese": 4,
        "blueberry": 2,
        "strawberry": 2,
        "lettuce": 1
      }
      );
    const savedSoupKitchen = await newSoupKitchen.save();
    
    res.json(savedSoupKitchen);
});
