const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

// Password reset routes ONLY
router.post("/forgot-password", authController.forgotPassword);
router.get("/reset-password/:token", authController.validateToken);
router.post("/reset-password/:token", authController.resetPassword);

module.exports = router;