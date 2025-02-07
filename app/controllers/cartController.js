const { client } = require("../config/db");
const { ObjectId } = require("mongodb");

const cartCollection = client.db("bistroDB").collection("carts");

const getCarts = async (req, res) => {
  try {
    const email = req.query.email;
    const query = { email: email };
    const result = await cartCollection.find(query).toArray();
    res.send(result);
  } catch (error) {
    console.error("Can not get carts:", error);
    res.status(500).send({ message: "Can not get carts" });
  }
};

const createCartItem = async (req, res) => {
  try {
    const cartItem = req.body;
    const result = await cartCollection.insertOne(cartItem);
    res.send(result);
  } catch (error) {
    console.error("Can not create cart item:", error);
    res.status(500).send({ message: "Can not create cart item" });
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await cartCollection.deleteOne(query);
    res.send(result);
  } catch (error) {
    console.error("Can not delete cart item:", error);
    res.status(500).send({ message: "Can not delete cart item" });
  }
};

module.exports = {
  getCarts,
  createCartItem,
  deleteCartItem,
};
