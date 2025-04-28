const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const toggleBasket = async (req, res) => {
  try {
    const { seat, activityId } = req.body;
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

    const isSeatInBasket = user.basket.some(
        (s) =>
          s.seat &&
          s.seat.seatNumber === seat.seatNumber &&
          s.seat.zone === seat.zone &&
          s.activityId.toString() === activityId.toString()
      );
      
      if (isSeatInBasket) {
        user.basket = user.basket.filter(
          (s) =>
            !(
              s.seat &&
              s.seat.seatNumber === seat.seatNumber &&
              s.seat.zone === seat.zone &&
              s.activityId.toString() === activityId.toString()
            )
        );
      } else {
        user.basket.push({ activityId, seat, price: req.body.price });
      }
      
    await user.save();

    res.status(200).json({ basket: user.basket });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};


const clearBasket = async (req, res) => {
  try {
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

    user.basket = []; 
    await user.save();

    res.status(200).json({ message: "Basket cleared successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {toggleBasket, clearBasket};
