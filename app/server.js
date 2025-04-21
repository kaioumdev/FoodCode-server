// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();
// const { connectDB } = require("./config/db");

// const authRoutes = require("./routes/authRoutes");
// const userRoutes = require("./routes/userRoutes");
// const menuRoutes = require("./routes/menuRoutes");
// const reviewRoutes = require("./routes/reviewRoutes");
// const cartRoutes = require("./routes/cartRoutes");
// const paymentRoutes = require("./routes/paymentRoutes");
// const adminRoutes = require("./routes/adminRoutes");

// const app = express();
// const port = process.env.PORT || 5001;

// // app.use(cors());
// const corsOptions = {
//   origin: 'https://food-code-client.vercel.app',
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
//   credentials: true,
//   allowedHeaders: ['Content-Type', 'Authorization']
// };
// app.use(cors(corsOptions));
// app.options('*', cors(corsOptions)); // ✅ Handle Preflight Requests
// app.use(express.json());
// connectDB();

// app.use("/auth", authRoutes);
// app.use("/users", userRoutes);
// app.use("/menu", menuRoutes);
// app.use("/review", reviewRoutes);
// app.use("/carts", cartRoutes);
// app.use("/payments", paymentRoutes);
// app.use("/admin", adminRoutes);

// app.get("/", (req, res) => {
//   res.send("Connect to the FoodCode Application Successfully!");
// });

// app.listen(port, () => {
//   console.log(`Example app listening by my on port ${port}`);
// });

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

// ✅ Define CORS options
const corsOptions = {
  origin: 'https://food-code-client.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
};

// ✅ Use CORS with options
app.use(cors(corsOptions));

// ✅ Handle preflight OPTIONS for all routes
app.options('*', cors(corsOptions));

// ✅ Body parser middleware
app.use(express.json());

// ✅ Connect DB
connectDB();

// ✅ Routes
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

// ✅ Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
