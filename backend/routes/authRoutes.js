const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

// ✅ Register & Login
router.post("/register", authController.register);
router.post("/login", authController.login);

// ✅ Password reset
router.post("/forgot-password", authController.forgotPassword);
router.get("/reset-password/:token", authController.validateToken);
router.post("/reset-password/:token", authController.resetPassword);

module.exports = router;