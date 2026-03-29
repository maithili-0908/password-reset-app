const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const sendEmail = require("../config/mail");

// REGISTER
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    res.json({ message: "User registered successfully" });

  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


// LOGIN
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({ message: "Login successful", user });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


// FORGOT PASSWORD
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 15 * 60 * 1000;

    await user.save();

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    await sendEmail(user.email, "Password Reset", `<a href="${resetLink}">${resetLink}</a>`);

    res.json({ message: "Reset link sent" });

  } catch (error) {
    console.error("Forgot error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


// RESET PASSWORD
exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();

    res.json({ message: "Password reset successful" });

  } catch (error) {
    console.error("Reset error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};