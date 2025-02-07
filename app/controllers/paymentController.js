const { client } = require("../config/db");
const { ObjectId } = require("mongodb");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const paymentCollection = client.db("bistroDB").collection("payments");
const cartCollection = client.db("bistroDB").collection("carts");

const createPaymentIntent = async (req, res) => {
  try {
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
  } catch (error) {
    console.error("Can not create createPaymentIntent:", error);
    res.status(500).send({ message: "Can not create createPaymentIntent" });
  }
};

const getPayments = async (req, res) => {
  try {
    const email = req.params.email;
    const query = { email: email };
    if (req.params.email !== req.decoded.email) {
      return res.status(403).send({ message: "Forbidden access" });
    }
    const result = await paymentCollection.find(query).toArray();
    res.send(result);
  } catch (error) {
    console.error("Can not get payments:", error);
    res.status(500).send({ message: "Can not get payments" });
  }
};

const createPayment = async (req, res) => {
  try {
    const payment = req.body;
    const paymentResult = await paymentCollection.insertOne(payment);

    const query = {
      _id: {
        $in: payment.cartIds.map((id) => new ObjectId(id)),
      },
    };
    const deleteResult = await cartCollection.deleteMany(query);
    res.send({ paymentResult, deleteResult });
  } catch (error) {
    console.error("Can not create payment:", error);
    res.status(500).send({ message: "Can not create payment" });
  }
};

module.exports = {
  createPaymentIntent,
  getPayments,
  createPayment,
};
