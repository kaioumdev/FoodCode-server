const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5001;

const name = process.env.DB_NAME;
const password = process.env.DB_PASS;


app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${name}:${password}@cluster0.40hja.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
    await client.connect();
    const userCollection = client.db("bistroDB").collection("users");
    const menuCollection = client.db("bistroDB").collection("menu");
    const reviewCollection = client.db("bistroDB").collection("reviews");
    const cartCollection = client.db("bistroDB").collection("carts");

    //userCollection
    app.post("/users", async(req, res) => {
      const user = req.body;
      const query = {email: user.email}
      const existingUser = await userCollection.findOne(query);
      if (existingUser) {
        res.send("User already exists");
        return;
      }
      const result = await userCollection.insertOne(user);
      res.send(result);
    })

    app.get("/menu", async(req, res) => {
        const result = await menuCollection.find().toArray();
        res.send(result);
    })

    app.get("/review", async(req, res) => {
        const result = await reviewCollection.find().toArray();
        res.send(result);
    })

    app.get("/carts", async(req, res) => {
      const email = req.query.email;
      const query = {email: email}
      const result = await cartCollection.find(query).toArray();
      res.send(result);
    })

    app.delete("/carts/:id", async(req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await cartCollection.deleteOne(query);
      res.send(result);
    })

    app.post("/carts", async(req, res) => {
      const cartItem = req.body;
      const result = await cartCollection.insertOne(cartItem);
      res.send(result);
    })

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Bistro World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})