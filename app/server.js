const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connectDB } = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const menuRoutes = require("./routes/menuRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const cartRoutes = require("./routes/cartRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();
const port = process.env.PORT || 5001;

// app.use(cors());
app.options('*', cors({
  origin: 'https://food-code-client.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true
}));


connectDB();

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/menu", menuRoutes);
app.use("/review", reviewRoutes);
app.use("/carts", cartRoutes);
app.use("/payments", paymentRoutes);
app.use("/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Connect to the FoodCode Application Successfully!");
});

app.listen(port, () => {
  console.log(`Example app listening by my on port ${port}`);
});
