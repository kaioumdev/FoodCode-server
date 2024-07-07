// const express = require('express')
// const app = express()
// const cors = require('cors')
// const jwt = require('jsonwebtoken');
// require('dotenv').config()
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// const port = process.env.PORT || 5001;

// const name = process.env.DB_NAME;
// const password = process.env.DB_PASS;


// app.use(cors())
// app.use(express.json())


// const uri = `mongodb+srv://${name}:${password}@cluster0.40hja.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     await client.connect();
//     const userCollection = client.db("bistroDB").collection("users");
//     const menuCollection = client.db("bistroDB").collection("menu");
//     const reviewCollection = client.db("bistroDB").collection("reviews");
//     const cartCollection = client.db("bistroDB").collection("carts");

//     //jwt token related api
//     app.post("/jwt", async(req, res) => {
//       const user = req.body;
//       const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'});
//       res.send({token})
//     })

//     const verifyToken = (req, res, next) => {
//       console.log(req.headers.authorization);
//       if(!req.headers.authorization){
//         return res.status(401).send({message: "Unauthorized Access token"});
        
//       }
//       const token = req.headers.authorization.split(" ")[1];
//       jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
//         if(error){
//           return res.status(401).send({message: "Forbidden Access token"});
          
//         }
//         req.decoded = decoded;
//         next();
//       });
//     }
    

//     //user related api
//     app.get("/users", verifyToken, async (req, res) => {
//       console.log('Inside verify token',req.headers)
//       const result = await userCollection.find().toArray();
//       res.send(result);
//     })

//     app.post("/users", async(req, res) => {
//       const user = req.body;
//       const query = {email: user.email}
//       const existingUser = await userCollection.findOne(query);
//       if (existingUser) {
//         res.send("User already exists");
//         return;
//       }
//       const result = await userCollection.insertOne(user);
//       res.send(result);
//     })

//     app.patch("/users/admin/:id", async (req, res) => {
//       try {
//         const id = req.params.id;
//         const filter = { _id: new ObjectId(id) }; // Assuming the ID is stored as an ObjectId in the database
//         const updatedDoc = {
//           $set: {
//             role: 'admin',
//           },
//         };
//         const result = await userCollection.updateOne(filter, updatedDoc);
//         console.log(result);
//         res.send(result);
//       } catch (error) {
//         console.error("Error updating user role:", error);
//         res.status(500).send({ message: "An error occurred" });
//       }
//     });

//     app.delete("/users/:id", async(req, res) => {
//       const id = req.params.id;
//       const query = {_id: new ObjectId(id)};
//       const result = await userCollection.deleteOne(query);
//       res.send(result);
//     });


//     //menu related api methods
//     app.get("/menu", async(req, res) => {
//         const result = await menuCollection.find().toArray();
//         res.send(result);
//     })

//     app.get("/review", async(req, res) => {
//         const result = await reviewCollection.find().toArray();
//         res.send(result);
//     })

//     app.get("/carts", async(req, res) => {
//       const email = req.query.email;
//       const query = {email: email}
//       const result = await cartCollection.find(query).toArray();
//       res.send(result);
//     })

//     app.delete("/carts/:id", async(req, res) => {
//       const id = req.params.id;
//       const query = {_id: new ObjectId(id)};
//       const result = await cartCollection.deleteOne(query);
//       res.send(result);
//     })

//     app.post("/carts", async(req, res) => {
//       const cartItem = req.body;
//       const result = await cartCollection.insertOne(cartItem);
//       res.send(result);
//     })

//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     // await client.close();
//   }
// }
// run().catch(console.dir);

// app.get('/', (req, res) => {
//   res.send('Bistro World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })


// server.js

const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5001;

const name = process.env.DB_NAME;
const password = process.env.DB_PASS;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${name}:${password}@cluster0.40hja.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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

    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
      res.send({ token });
    });

    const verifyToken = (req, res, next) => {
      console.log(req.headers.authorization);
      if (!req.headers.authorization) {
        return res.status(401).send({ message: "Unauthorized Access token" });
      }
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
        if (error) {
          return res.status(401).send({ message: "Forbidden Access token" });
        }
        req.decoded = decoded;
        next();
      });
    };

    app.get("/users", verifyToken, async (req, res) => {
      console.log('Inside verify token', req.headers);
      const result = await userCollection.find().toArray();
      res.send(result);
    });

    app.get("/users/admin/:email", verifyToken, async(req, res) => {
      const email = req.params.email;
     if(email !== req.decoded.email){
      return res.status(403).send({message: 'Unauthorized accesss'})
     };
     const query = {email: email};
     const user = await userCollection.findOne(query);
     let admin = false;
     if(user){
      admin = user?.role === 'admin'
     };
     res.send({admin: admin});
    })

    app.post("/users", async (req, res) => {
      const user = req.body;
      const query = { email: user.email };
      const existingUser = await userCollection.findOne(query);
      if (existingUser) {
        res.send("User already exists");
        return;
      }
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    app.patch("/users/admin/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const updatedDoc = {
          $set: {
            role: 'admin',
          },
        };
        const result = await userCollection.updateOne(filter, updatedDoc);
        console.log(result);
        res.send(result);
      } catch (error) {
        console.error("Error updating user role:", error);
        res.status(500).send({ message: "An error occurred" });
      }
    });

    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await userCollection.deleteOne(query);
      res.send(result);
    });

    app.get("/menu", async (req, res) => {
      const result = await menuCollection.find().toArray();
      res.send(result);
    });

    app.get("/review", async (req, res) => {
      const result = await reviewCollection.find().toArray();
      res.send(result);
    });

    app.get("/carts", async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const result = await cartCollection.find(query).toArray();
      res.send(result);
    });

    app.delete("/carts/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await cartCollection.deleteOne(query);
      res.send(result);
    });

    app.post("/carts", async (req, res) => {
      const cartItem = req.body;
      const result = await cartCollection.insertOne(cartItem);
      res.send(result);
    });

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Bistro World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
