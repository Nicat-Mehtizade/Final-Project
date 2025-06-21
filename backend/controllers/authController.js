const User = require("../models/userSchema");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existUser = await User.findOne({ email: email });
    if (existUser) {
      return res.status(400).json({
        status: "error",
        message: "Email already exist",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      image: "",
    });
    await newUser.save();

    res.status(201).json({
      status: "success",
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existUser = await User.findOne({ email });
    if (!existUser || !(await bcrypt.compare(password, existUser.password))) {
      return res.status(400).json({
        status: "error",
        message: "Invalid email or password",
      });
    }
    const token = jwt.sign(
      {
        username: existUser.username,
        id: existUser._id,
        role: existUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 1000,
      sameSite: "Lax",
    });

    res.status(200).json({
      status: "success",
      message: "User logged in successfully",
      token: `Bearer ${token}`,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    status: "success",
    message: "User logged out successfully",
  });
};

const setPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    if (!password || password.length < 8) {
      return res.status(400).json({
        message:
          "Password is required and should be at least 8 characters long.",
      });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.hasPassword = false;
    await user.save();

    res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    const resetLink = `https://final-project-five-olive.vercel.app/reset-password?token=${token}`;

    const html = `
      <p style="font-size: 18px; line-height: 1.5; color: #333;">Hi ${user.username},</p>

<p style="font-size: 18px; line-height: 1.5; color: #333;">
  We received a request to reset your password. Please click the button below to reset your password.
</p>


<div style="text-align: center; margin: 20px;">
  <a href="${resetLink}" style="
    background-color: #ffcc00;
    color: #fff;
    padding: 14px 30px;
    text-decoration: none;
    border-radius: 30px;
    font-size: 16px;
    font-weight: bold;
    display: inline-block;
  ">
    Reset Your Password
  </a>
</div>



    `;

    await sendEmail(user.email, "Reset your password", html);

    res.status(200).json({ message: "Reset email sent successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.query;
    const { newPassword } = req.body;

    if (!token) {
      return res.status(400).json({ message: "Token is missing." });
    }

    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(400).json({ message: "Invalid or expired token." });
    }

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long.",
      });
    }

    const user = await User.findById(payload.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.hasPassword = true;

    const updatedUser = await user.save();

    res.status(200).json({ message: "Password reset successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

module.exports = {
  register,
  login,
  logout,
  setPassword,
  forgotPassword,
  resetPassword,
};
