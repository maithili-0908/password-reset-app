const express = require("express");
const router = express.Router();

const {
  createUser,
  getUsers,
  forgotPassword,
  validateToken,
  resetPassword
} = require("../controllers/authController");

// User management
router.post("/users", createUser);
router.get("/users", getUsers);

// Password reset flow
router.post("/forgot-password", forgotPassword);
router.get("/reset-password/:token", validateToken);
router.post("/reset-password/:token", resetPassword);

module.exports = router;