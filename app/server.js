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
app.use(cors({
  origin: "https://food-code-client.vercel.app", // frontend domain
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  // allowedHeaders: ["Content-Type", "Authorization"],
  // credentials: true,
}));
app.options("*", cors()); // Pre-flight request for all routes
// const corsOptions = {
//   origin: ['https://food-code-client.vercel.app', 'http://localhost:3000'],
//   methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
//   // allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
//   credentials: true,
// };

// // Apply CORS as early as possible in the middleware chain
// app.use(cors(corsOptions));

// Express middleware
app.use(express.json());

app.options('*', (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "https://food-code-client.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  return res.sendStatus(204);
});

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