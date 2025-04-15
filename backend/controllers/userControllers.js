const User = require("../models/userSchema");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});

    if (users.length === 0) {
      res.status(404).json({
        message: "Users not found",
      });
    }

    res.status(200).json({
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      data: deletedUser,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        ...req.body,
        image: req.file && `http://localhost:8000/${req.file.path}`,
      },
      { new: true }
    );

    if (!updatedUser) {
      res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User Updated",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const updatePassword = async (req, res) => {
  
  const { newPassword,currentPassword} = req.body;
  const userId = req.params.id;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (!newPassword || newPassword.length < 8) {
    return res.status(400).json({ message: "Password is too short" });
  }

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!passwordRegex.test(newPassword)) {
    return res.status(400).json({
      message: "New password must be at least 8 characters and include a number",
    });
  }

  try {

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    if (newPassword === currentPassword) {
      return res.status(400).json({ message: "New password cannot be the same as the current password" });
    }


    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(newPassword, salt);

    user.password = hashed;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
  updatePassword
};
