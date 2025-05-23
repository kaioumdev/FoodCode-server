const { client } = require("../config/db");
const { ObjectId } = require("mongodb");

const menuCollection = client.db("bistroDB").collection("menu");

const getMenu = async (req, res) => {
  try {
    const result = await menuCollection.find().toArray();
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: "Can not get menu" });
  }
};

const getMenuItem = async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await menuCollection.findOne(query);
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: "Can not get menu item" });

  }
};

const createMenuItem = async (req, res) => {
  try {
    const menuItem = req.body;
    const result = await menuCollection.insertOne(menuItem);
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: "Can not create menu item" });

  }
};

const updateMenuItem = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).send({ message: "Can not update menu item" });

  }
};

const deleteMenuItem = async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await menuCollection.deleteOne(query);
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: "Can not delete menu item" });
  }
};

module.exports = {
  getMenu,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
};
