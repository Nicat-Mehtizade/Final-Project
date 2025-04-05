const User = require("../models/userSchema");

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
      { ...req.body },
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

module.exports = {
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
};
