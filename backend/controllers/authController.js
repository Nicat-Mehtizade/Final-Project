const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existUser = await User.findOne({ email: email });
    if (existUser) {
      res.status(400).json({
        status: "error",
        message: "Email already exist",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
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
      { expiresIn: 60 * 60 }
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

module.exports = { register, login,logout };
