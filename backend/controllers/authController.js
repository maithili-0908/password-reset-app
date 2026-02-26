const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const transporter = require("../config/mail");
const { generateToken } = require("../utils/token");

/* =========================================================
   FORGOT PASSWORD
   - Check if user exists
   - Generate reset token
   - Save hashed token + expiry in DB
   - Send email with reset link
========================================================= */
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if email provided
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate random token
    const token = generateToken();

    // Hash token before saving to DB
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    // Save token + expiry (15 minutes)
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;

    await user.save();

    // Create reset link
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;

    // Send email
    await transporter.sendMail({
      from: `"Password Reset" <${process.env.MAIL_USER}>`,
      to: email,
      subject: "Password Reset Request",
      html: `
        <h3>Password Reset</h3>
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>This link will expire in 15 minutes.</p>
      `
    });

    res.status(200).json({ message: "Reset link sent to email" });

  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ message: "Error sending reset email" });
  }
};


/* =========================================================
   VALIDATE RESET TOKEN
   - Check if token exists and not expired
========================================================= */
exports.validateToken = async (req, res) => {
  try {
    const { token } = req.params;

    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    res.status(200).json({ message: "Token is valid" });

  } catch (error) {
    console.error("Validate Token Error:", error);
    res.status(500).json({ message: "Token validation failed" });
  }
};


/* =========================================================
   RESET PASSWORD
   - Validate token again
   - Hash new password
   - Clear token fields
========================================================= */
exports.resetPassword = async (req, res) => {
  try {
    const { password } = req.body;
    const { token } = req.params;

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: "Token expired or invalid" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();

    res.status(200).json({ message: "Password reset successful" });

  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({ message: "Password reset failed" });
  }
};