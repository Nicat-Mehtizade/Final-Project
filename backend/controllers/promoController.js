const PromoCode = require("../models/promoCodeSchema");
const User = require("../models/userSchema");

const checkPromoCode = async (req, res) => {
  const { code, userId } = req.body;
  try {
    const promo = await PromoCode.findOne({ code });

    if (!promo) {
      return res.status(404).json({ message: "Promo code not found." });
    }

    if (promo.expiresAt && new Date() > promo.expiresAt) {
      return res.status(400).json({ message: "Promo code expired." });
    }

    if (promo.usageLimit && promo.usedCount >= promo.usageLimit) {
      return res
        .status(400)
        .json({ message: "Promo code usage limit reached." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    await PromoCode.findOneAndUpdate(
      { code },
      { $inc: { usedCount: 1 } },
      { new: true }
    );

    if (!user.usedPromoCodes.includes(promo._id)) {
      user.usedPromoCodes.push(promo._id);
      await user.save();
    }

    return res.json({
      message: "Promo code is valid.",
      discount: `${promo.discount}%`,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const createPromoCode = async (req, res) => {
  try {
    const addedPromoCode = await PromoCode.create({ ...req.body });
    console.log(req.body);
    res.status(201).json({
      data: addedPromoCode,
      message: "Successfully added",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const getAllPromoCodes = async (req, res) => {
  try {
    const promoCodes = await PromoCode.find();

    if (promoCodes.length === 0) {
      return res.status(404).json({ message: "No promo codes found." });
    }

    return res.json({
      message: "Promo codes retrieved successfully.",
      data: promoCodes,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const deletePromoCode = async (req, res) => {
  const { id } = req.params;

  try {
    const promo = await PromoCode.findOneAndDelete({ _id:id });

    if (!promo) {
      return res.status(404).json({ message: "Promo code not found." });
    }

    return res.json({
      message: "Promo code deleted successfully.",
      data:promo
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: error.message,
    });
  }
};

const updatePromoCode = async (req, res) => {
  const { id } = req.params; 
  const updateData = req.body; 

  try {
    const promo = await PromoCode.findOneAndUpdate({ _id:id }, updateData, { new: true });

    if (!promo) {
      return res.status(404).json({ message: "Promo code not found." });
    }

    return res.json({
      message: "Promo code updated successfully.",
      data: promo,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = { createPromoCode, checkPromoCode, getAllPromoCodes,deletePromoCode,updatePromoCode };
