import { MongoClient, ServerApiVersion } from 'mongodb';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import SoupKitchen from './models/soupKitchen.js';
import Restaurant from './models/restaurant.js';
import Driver from './models/driver.js'
import solaceApp from './SolaceApp.js';

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

solaceApp.initialize();


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

  // console.log(updates)

  try {
      // Find the document by id and update it with the values provided in the request body
      // { new: true } option returns the document after update
      const updatedRestaurant = await Restaurant.findByIdAndUpdate(id, updates, { new: true });

      if (!updatedRestaurant) {
          return res.status(404).send("Soup kitchen not found.");
      }

      let updatedIngredients = [];
      for(const category in updates.ingredients){
        // console.log('hi');
        // console.log(updates.ingredients[category]);
        for(const name in updates.ingredients[category]){
          // console.log(name, updates.ingredients[category][name])
          updatedIngredients.push({name, quantity: updates.ingredients[category][name]})
        }
      }

      // console.log(updatedIngredients)

      updatedIngredients.forEach(ingredient => {
        const message = {
          restaurantId: id,
          ingredient: ingredient.name,
          quantity: ingredient.quantity,
        };
        // Construct the topic name based on the ingredient
        const topic = `restaurants/${id}/ingredients/${ingredient.name}`;
       // console.log(topic);
        solaceApp.publishMessage(topic, JSON.stringify(message));
      });

      res.status(200).json(updatedRestaurant);

  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

app.get("/drivers", async (req, res) => {
  try{
    const drivers = await Driver.find();
    res.status(200).json(drivers)
  } catch(err){
    res.status(500).json({error: err.message})
  }
})

app.post("/drivers", async (req, res) => {
  const newDriver = new Driver(req.body);
  try{
    const savedDriver = await newDriver.save();
    res.json(savedDriver);
  } catch(err){
    res.status(500).json({error: err.message})
  } 

})

app.post("/delivery", async (req, res) => {

  // body:
  // accepted : t/f
  // restaurantId
  // kitchenId

  const { accepted, driverId, restaurantId, kitchenId, item, itemQuantity } = req.body;
  
  if(accepted === false){
    res.status(200).json({message: "Order successfully rejected"})
    return;
  }
  try {
    // Fetch Restaurant and Kitchen locations
    const restaurant = await Restaurant.findById(restaurantId);
    const kitchen = await SoupKitchen.findById(kitchenId);

    if (!restaurant || !kitchen) {
      res.status(404).json({ message: "Restaurant or Kitchen not found" });
      return;
    }

    console.log(driverId);
    const delivery = {
        restaurantName : restaurant.name,
        kitchenName : kitchen.name,
        restaurantLocation: restaurant.location.coordinates, // Assuming location is directly under the restaurant object
        kitchenLocation: kitchen.location.coordinates,       // Assuming location is directly under the kitchen object
        item,
        itemQuantity
    }

    const message = {
      restaurantId,
      kitchenId,
      driverId,
      ...delivery
      
    };

    const updatedDriver = await Driver.findByIdAndUpdate(driverId, {delivery}, { new: true });

    const topic = `delivery/${restaurantId}/${kitchenId}/${item}`;
    // console.log(topic);
    // console.log(message);
    // Here, you would publish the message to the topic
    solaceApp.publishMessage(topic, JSON.stringify(message));

    res.json({message: "Delivery information published", data: message, driver: updatedDriver});
  } catch (error) {
    console.error("Failed to process delivery request:", error);
    res.status(500).json({ error: error.message });
  }



})


app.post('/subscribe', (req, res) => {
  solaceApp.subscribeToTopic(`restaurants/65e3ffcc3770b8e651dec385/ingredients/milk`);
  res.status(200).send('{"result":"ok"}');
});

// Publish example
app.post('/publish', (req, res) => {
  let message = JSON.stringify({text: "Hello"});
  let topic = "SomeTopic";
  solaceApp.publishMessage(topic, message);
  res.status(200).send('{"result":"ok"}');
});