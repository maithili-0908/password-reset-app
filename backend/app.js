const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
require("dotenv").config();

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));

// Error Handler (must be LAST)
app.use(errorHandler);

module.exports = app;