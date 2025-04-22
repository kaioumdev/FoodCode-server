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

// ✅ CORS configuration (Fixes PATCH + preflight issues)
app.use(cors({
  origin: "https://food-code-client.vercel.app", // frontend domain
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// ✅ Express middleware
app.use(express.json());

// ✅ Handle all OPTIONS preflight requests (Important for PATCH/DELETE)
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "https://food-code-client.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  res.sendStatus(204);
});

// ✅ Connect to database
connectDB();

// ✅ Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/menu", menuRoutes);
app.use("/review", reviewRoutes);
app.use("/carts", cartRoutes);
app.use("/payments", paymentRoutes);
app.use("/admin", adminRoutes);

// ✅ Root endpoint
app.get("/", (req, res) => {
  res.send("Connect to the FoodCode Application Successfully!");
});

// ✅ Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
