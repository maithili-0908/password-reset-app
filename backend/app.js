const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://passwordresetmai.netlify.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

// Test Route
app.get("/", (req, res) => {
  res.send("🚀 Password Reset API is running");
});

// Routes
app.use("/api/auth", require("./routes/authRoutes"));

// Error handler (MUST be last)
app.use(errorHandler);

module.exports = app;