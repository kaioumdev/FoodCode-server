const { client } = require("../config/db");
const { ObjectId } = require("mongodb");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { Resend } = require("resend");

// const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

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
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["abdulkaiyumfahim.social@gmail.com"],
      subject: "Receipt for your payment",
      html: `<div>
          <h1>Thanks for the payment</h1>
           <h1>Thank you for your order!</h1>
           <h4>Your transactionId: <strong>${payment.transactionId}</strong></h4>
         <p>We would like to get your feedback about our foods</p>
           </div>`,
      attachments: [
        {
          path: "https://resend.com/static/sample/invoice.pdf",
          filename: "invoice.pdf",
        },
      ],
    });
    res.send({ paymentResult, deleteResult });
  } catch (error) {
    res.status(500).send({ message: "Can not create payment" });
  }
};

module.exports = {
  createPaymentIntent,
  getPayments,
  createPayment,
};
