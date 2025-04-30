const mongoose = require("mongoose");

const promoCodeSchema = mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    discount: { type: String, required: true },
    usageLimit: { type: String, default: null },
    usedCount: { type: Number, default: 0 },
    expiresAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const PromoCode = mongoose.model("PromoCode", promoCodeSchema);
module.exports = PromoCode;
