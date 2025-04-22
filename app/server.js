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

// ✅ Use CORS middleware properly
app.use(cors({
  origin: "https://food-code-client.vercel.app",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-CSRF-Token",
    "X-Requested-With",
    "Accept",
    "Accept-Version",
    "Content-Length",
    "Content-MD5",
    "Date",
    "X-Api-Version"
  ],
  credentials: true
}));

// ✅ Handle preflight requests (for PATCH/DELETE/etc)
app.options("*", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "https://food-code-client.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.sendStatus(204);
});

// ✅ Body parser middleware
app.use(express.json());

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

// ✅ Root route
app.get("/", (req, res) => {
  res.send("Connect to the FoodCode Application Successfully!");
});

// ✅ Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
