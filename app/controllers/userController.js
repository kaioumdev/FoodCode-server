const { client } = require("../config/db");
const { ObjectId } = require("mongodb");

const userCollection = client.db("bistroDB").collection("users");

const getUsers = async (req, res) => {
  const result = await userCollection.find().toArray();
  res.send(result);
};

const getUserAdminStatus = async (req, res) => {
  try {
    const email = req.params.email;
    if (email !== req.decoded.email) {
      return res.status(403).send({ message: "Forbidden access" });
    }
    const query = { email: email };
    const user = await userCollection.findOne(query);
    let admin = false;
    if (user) {
      admin = user?.role === "admin";
    }
    res.send({ admin: admin });
  } catch (error) {
    console.error("Error fetching admin status:", error);
    res.status(500).send({ message: "An Admin Status occurred" });
  }
};

const createUser = async (req, res) => {
  try {
    const user = req.body;
    // Check if user already exists
    const query = { email: user.email };
    const existingUser = await userCollection.findOne(query);

    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    // Assign default role if not provided
    const newUser = {
      ...user,
      role: user?.role || "user", // Set default role to "user" if not provided
    };

    // Insert new user
    const result = await userCollection.insertOne(newUser);
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send({ message: "Error creating user", error });
  }
};


const makeAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const updatedDoc = {
      $set: {
        role: "admin",
      },
    };
    const result = await userCollection.updateOne(filter, updatedDoc);
    res.send(result);
  } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).send({ message: "An error occurred" });
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await userCollection.deleteOne(query);
  res.send(result);
};

module.exports = {
  getUsers,
  getUserAdminStatus,
  createUser,
  makeAdmin,
  deleteUser,
};
