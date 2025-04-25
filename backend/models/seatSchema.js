const mongoose = require("mongoose");

const seatSchema = mongoose.Schema({
  row: { type: Number, required: true },
  col: { type: Number, required: true },
  type: {
    type: String,
    enum: ["vip", "standard", "silver", "gold"],
    default: "standard",
  },
  seatNumber: { type: String, required: true },
  zone: { type: String, enum: ["A", "B", "C", "D"], required: true },
  isBooked: { type: Boolean, default: false },
});

module.exports = seatSchema;