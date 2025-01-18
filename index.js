// const express = require("express");
// const app = express();
// const cors = require("cors");
// const jwt = require("jsonwebtoken");
// require("dotenv").config();
// const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
// const port = process.env.PORT || 5001;
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// const name = process.env.DB_NAME;
// const password = process.env.DB_PASS;

// app.use(cors());
// app.use(express.json());

// const uri = `mongodb+srv://${name}:${password}@cluster0.40hja.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// const client = new MongoClient(uri, {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//     },
// });

// async function run() {
//     try {
//         await client.connect();
//         const userCollection = client.db("bistroDB").collection("users");
//         const menuCollection = client.db("bistroDB").collection("menu");
//         const reviewCollection = client.db("bistroDB").collection("reviews");
//         const cartCollection = client.db("bistroDB").collection("carts");
//         const paymentCollection = client.db("bistroDB").collection("payments");

//         //create jwt token
//         app.post("/jwt", async (req, res) => {
//             const user = req.body;
//             const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
//                 expiresIn: "1h",
//             });
//             res.send({ token });
//         });

//         const verifyToken = (req, res, next) => {
//             console.log(req.headers.authorization);
//             if (!req.headers.authorization) {
//                 return res.status(401).send({ message: "Unauthorized Access token" });
//             }
//             const token = req.headers.authorization.split(" ")[1];
//             jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
//                 if (error) {
//                     return res.status(403).send({ message: "Forbidden Access token" });
//                 }
//                 req.decoded = decoded;
//                 next();
//             });
//         };

//         //use verify admin after verify token
//         const verifyAdmin = async (req, res, next) => {
//             const email = req.decoded.email;
//             const query = { email: email };
//             const user = await userCollection.findOne(query);
//             const isAdmin = user?.role === "admin";
//             if (!isAdmin) {
//                 return res
//                     .status(403)
//                     .send({ message: "Forbidden accesss & user not admin" });
//             }
//             next();
//         };

//         app.get("/users", verifyToken, async (req, res) => {
//             console.log('Inside verify token', req.headers);
//             const result = await userCollection.find().toArray();
//             res.send(result);
//         });

//         app.get("/users/admin/:email", verifyToken, async (req, res) => {
//             const email = req.params.email;
//             if (email !== req.decoded.email) {
//                 return res?.status(403)?.send({ message: "Forbidden accesss" });
//             }
//             const query = { email: email };
//             const user = await userCollection.findOne(query);
//             let admin = false;
//             if (user) {
//                 admin = user?.role === "admin";
//             }
//             res.send({ admin: admin });
//         });

//         app.post("/users", async (req, res) => {
//             const user = req.body;
//             const query = { email: user.email };
//             const existingUser = await userCollection.findOne(query);
//             if (existingUser) {
//                 res.send("User already exists");
//                 return;
//             }
//             const result = await userCollection.insertOne(user);
//             res.send(result);
//         });

//         //make admin by patch method
//         app.patch(
//             "/users/admin/:id",
//             verifyToken,
//             verifyAdmin,
//             async (req, res) => {
//                 try {
//                     const id = req.params.id;
//                     const filter = { _id: new ObjectId(id) };
//                     const updatedDoc = {
//                         $set: {
//                             role: "admin",
//                         },
//                     };
//                     const result = await userCollection.updateOne(filter, updatedDoc);
//                     res.send(result);
//                 } catch (error) {
//                     console.error("Error updating user role:", error);
//                     res.status(500).send({ message: "An error occurred" });
//                 }
//             }
//         );

//         //delete user by delete method
//         app.delete("/users/:id", verifyToken, verifyAdmin, async (req, res) => {
//             const id = req.params.id;
//             const query = { _id: new ObjectId(id) };
//             const result = await userCollection.deleteOne(query);
//             res.send(result);
//         });

//         //menu related api
//         app.get("/menu", async (req, res) => {
//             const result = await menuCollection.find().toArray();
//             res.send(result);
//         });

//         //get single menu item
//         app.get("/menu/:id", async (req, res) => {
//             const id = req.params.id;
//             const query = { _id: new ObjectId(id) };
//             const result = await menuCollection.findOne(query);
//             res.send(result);
//         });

//         app.post("/menu", verifyToken, verifyAdmin, async (req, res) => {
//             const menuItem = req.body;
//             const result = await menuCollection.insertOne(menuItem);
//             res.send(result);
//         });

//         //menu update api call to update menu items with new menu items
//         app.patch("/menu/:id", async (req, res) => {
//             const item = req.body;
//             const id = req.params.id;
//             const filter = { _id: new ObjectId(id) };
//             const updatedDoc = {
//                 $set: {
//                     name: item.name,
//                     category: item.category,
//                     price: item.price,
//                     recipe: item.recipe,
//                     image: item.image,
//                 },
//             };
//             const result = await menuCollection.updateOne(filter, updatedDoc);
//             res.send(result);
//         });

//         //menu delete api call
//         app.delete("/menu/:id", verifyToken, verifyAdmin, async (req, res) => {
//             const id = req.params.id;
//             const query = { _id: new ObjectId(id) };
//             const result = await menuCollection.deleteOne(query);
//             res.send(result);
//         });

//         app.get("/review", async (req, res) => {
//             const result = await reviewCollection.find().toArray();
//             res.send(result);
//         });

//         app.get("/carts", async (req, res) => {
//             const email = req.query.email;
//             const query = { email: email };
//             const result = await cartCollection.find(query).toArray();
//             res.send(result);
//         });

//         app.delete("/carts/:id", async (req, res) => {
//             const id = req.params.id;
//             const query = { _id: new ObjectId(id) };
//             const result = await cartCollection.deleteOne(query);
//             res.send(result);
//         });

//         app.post("/carts", async (req, res) => {
//             const cartItem = req.body;
//             const result = await cartCollection.insertOne(cartItem);
//             res.send(result);
//         });

//         //payment realded method
//         app.post("/create-payment-intent", async (req, res) => {
//             const { price } = req.body;
//             const amount = parseInt(price * 100);
//             const paymentIntent = await stripe.paymentIntents.create({
//                 amount: amount,
//                 currency: "usd",
//                 payment_method_types: ["card"],
//             });

//             res.send({
//                 clientSecret: paymentIntent.client_secret,
//             });
//         });

//         app.get("/payments/:email", verifyToken, async (req, res) => {
//             const email = req.params.email;
//             const query = { email: email };
//             if (req.params.email !== req.decoded.email) {
//                 return res.status(403).send({ message: "Forbidden accesss" });
//             }
//             const result = await paymentCollection.find(query).toArray();
//             res.send(result);
//         });

//         app.post("/payments", async (req, res) => {
//             const payment = req.body;
//             const paymentResult = await paymentCollection.insertOne(payment);

//             //carefully delete each item from the cart
//             console.log("payment info", payment);
//             const query = {
//                 _id: {
//                     $in: payment.cartIds.map((id) => new ObjectId(id)),
//                 },
//             };
//             const deleteResult = await cartCollection.deleteMany(query);
//             res.send({ paymentResult, deleteResult });
//         });

//         //dashboard related api
//         app.get("/admin-stats", verifyToken, verifyAdmin, async (req, res) => {
//             const users = await userCollection.estimatedDocumentCount();
//             const menuItems = await menuCollection.estimatedDocumentCount();
//             const orders = await paymentCollection.estimatedDocumentCount();

//             //this is not the best way
//             // const payments = await paymentCollection.find().toArray();
//             // const revenue = payments.reduce((total, payment) => total + payment.price, 0);

//             const result = await paymentCollection
//                 .aggregate([
//                     {
//                         $group: {
//                             _id: null,
//                             totalRevenue: {
//                                 $sum: "$price",
//                             },
//                         },
//                     },
//                 ])
//                 .toArray();

//             const revenueResult = result.length > 0 ? result[0].totalRevenue : 0;
//             const revenue = parseFloat(revenueResult.toFixed(2));

//             res.send({ users, menuItems, orders, revenue });
//         });

//         //using aggregate pipeline
//         app.get("/order-stats", async (req, res) => {
//             const result = await paymentCollection
//                 .aggregate([
//                     {
//                         $unwind: "$menuItemIds",
//                     },
//                     {
//                         $lookup: {
//                             from: "menu",
//                             localField: "menuItemIds",
//                             foreignField: "_id",
//                             as: "menuItems",
//                         },
//                     },
//                     // {
//                     //   $unwind: '$menuItems'
//                     // },
//                     // {
//                     //   $group: {
//                     //     _id: '$menuItems.category',
//                     //     quantity: {$sum: 1},
//                     //     revenue: {$sum: '$menuItems.price'}
//                     //   }
//                     // }
//                 ])
//                 .toArray();
//             res.send(result);
//         });

//         console.log(
//             "Pinged your deployment. You successfully connected to MongoDB!"
//         );
//     } finally {
//         // await client.close();
//     }
// }
// run().catch(console.dir);

// app.get("/", (req, res) => {
//     res.send("Bistro World!");
// });

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`);
// });
