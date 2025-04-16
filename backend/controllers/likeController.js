const User = require("../models/userSchema"); 
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const toggleWishlist = async (req, res) => {
  try {
    const { id: activityId } = req.params;
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Token is missing" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isInWishlist = user.wishlist.some(
      (id) => id.toString() === activityId
    );
    
    if (isInWishlist) {
      user.wishlist = user.wishlist.filter(
        (id) => id.toString() !== activityId
      );
    } else {
      user.wishlist.push(activityId);
    }

    await user.save();

    res.status(200).json({ wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = toggleWishlist;
