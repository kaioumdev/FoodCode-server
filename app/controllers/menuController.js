const { client } = require("../config/db");
const { ObjectId } = require("mongodb");

const menuCollection = client.db("bistroDB").collection("menu");

const getMenu = async (req, res) => {
  const result = await menuCollection.find().toArray();
  res.send(result);
};

const getMenuItem = async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await menuCollection.findOne(query);
  res.send(result);
};

const createMenuItem = async (req, res) => {
  const menuItem = req.body;
  const result = await menuCollection.insertOne(menuItem);
  res.send(result);
};

const updateMenuItem = async (req, res) => {
  const item = req.body;
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const updatedDoc = {
    $set: {
      name: item.name,
      category: item.category,
      price: item.price,
      recipe: item.recipe,
      image: item.image,
    },
  };
  const result = await menuCollection.updateOne(filter, updatedDoc);
  res.send(result);
};

const deleteMenuItem = async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await menuCollection.deleteOne(query);
  res.send(result);
};

module.exports = {
  getMenu,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
};
