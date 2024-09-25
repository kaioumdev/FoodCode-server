const { client } = require("../config/db");
const { ObjectId } = require("mongodb");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const paymentCollection = client.db("bistroDB").collection("payments");
const cartCollection = client.db("bistroDB").collection("carts");

const createPaymentIntent = async (req, res) => {
  const { price } = req.body;
  const amount = parseInt(price * 100);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
    payment_method_types: ["card"],
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};

const getPayments = async (req, res) => {
  const email = req.params.email;
  const query = { email: email };
  if (req.params.email !== req.decoded.email) {
    return res.status(403).send({ message: "Forbidden access" });
  }
  const result = await paymentCollection.find(query).toArray();
  res.send(result);
};

const createPayment = async (req, res) => {
  const payment = req.body;
  const paymentResult = await paymentCollection.insertOne(payment);

  const query = {
    _id: {
      $in: payment.cartIds.map((id) => new ObjectId(id)),
    },
  };
  const deleteResult = await cartCollection.deleteMany(query);
  res.send({ paymentResult, deleteResult });
};

module.exports = {
  createPaymentIntent,
  getPayments,
  createPayment,
};
