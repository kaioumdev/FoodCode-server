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

// CORS configuration
const cors = require("cors");

app.use(cors({
  origin: "https://food-code-client.vercel.app", // allow your frontend domain
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], // include PATCH here
  credentials: true, // if you're using cookies or sessions
}));


// Express middleware
app.use(express.json());

// Connect to database
connectDB();

// Apply routes
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

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});