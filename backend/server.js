const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// load env variables
dotenv.config();

// connect database
connectDB();

const app = express();

// ✅ CORS (IMPORTANT for frontend connection)
app.use(cors({
  origin: "*"
}));

// middleware
app.use(express.json());

// routes
app.use("/api/auth", require("./routes/authRoutes"));

// test route (optional)
app.get("/", (req, res) => {
  res.send("API is running...");
});

// port
const PORT = process.env.PORT || 5000;

// start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});