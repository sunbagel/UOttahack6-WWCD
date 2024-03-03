import { MongoClient, ServerApiVersion } from 'mongodb';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import SoupKitchen from './models/soupKitchen.js';
import Restaurant from './models/restaurant.js';

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
app.use(express.json());
app.use(cors());
const port = 5000;


mongoose.connect(uri)
    .then(() => app.listen (port, () =>  console.log('server is running')))
    .catch((error )=> console.log(error.message))

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/soup_kitchens', async (req, res) => {

  try{
    const kitchens = await SoupKitchen.find();
    res.status(200).json(kitchens)
  } catch(err){
    res.status(500).json({error: err.message})
  }
})


app.post("/soup_kitchens", async (req, res) => {
    console.log(req.body);
    const newSoupKitchen = new SoupKitchen(req.body);
    try{
      const savedSoupKitchen = await newSoupKitchen.save();
      res.json(savedSoupKitchen);
    } catch(err){
      res.status(500).json({error: err.message})
    }
});

app.get('/soup_kitchens/:id?', async (req, res) => {
  try {
    if (req.params.id) {
      // If ID is provided, fetch a specific soup kitchen by ID
      const kitchen = await SoupKitchen.findById(req.params.id);
      if (!kitchen) {
        return res.status(404).json({ error: 'Soup kitchen not found' });
      }
      return res.status(200).json(kitchen);
    } else {
      // If no ID provided, fetch all soup kitchens
      const kitchens = await SoupKitchen.find();
      res.status(200).json(kitchens);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.put("/soup_kitchens/:id", async (req, res) => {
  const { id } = req.params; // Get the id from the URL
  const updates = req.body; // Assuming this contains the fields to update

  console.log(updates)

  try {
      // Find the document by id and update it with the values provided in the request body
      // { new: true } option returns the document after update
      const updatedSoupKitchen = await SoupKitchen.findByIdAndUpdate(id, updates, { new: true });

      if (!updatedSoupKitchen) {
          return res.status(404).send("Soup kitchen not found.");
      }

      res.json(updatedSoupKitchen);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});


app.get("/restaurants", async (req, res) =>{
  try{
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants)
  } catch(err){
    res.status(500).json({error: err.message})
  }
})

app.post("/restaurants", async (req, res) => {
  console.log(req.body);
  // NO VALIDATION
  const newRestaurant = new Restaurant(req.body);
  try{
    const savedRestaurant = await newRestaurant.save();
    res.json(savedRestaurant);
  } catch(err){
    res.status(500).json({error: err.message})
  } 
});



app.put("/restaurants/:id", async (req, res) => {
  const { id } = req.params; // Get the id from the URL
  const updates = req.body; // Assuming this contains the fields to update

  console.log(updates)

  try {
      // Find the document by id and update it with the values provided in the request body
      // { new: true } option returns the document after update
      const updatedRestaurant = await Restaurant.findByIdAndUpdate(id, updates, { new: true });

      if (!updatedRestaurant) {
          return res.status(404).send("Soup kitchen not found.");
      }

      res.json(updatedRestaurant);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});






