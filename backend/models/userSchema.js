const mongoose = require("mongoose");
const seatSchema=require("./seatSchema")

const userSchema = mongoose.Schema(
  {
    googleId: { type: String, unique: true, sparse: true },
    facebookId: { type: String, unique: true,sparse: true },
    username: { type: String, required: false, trim: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: false, trim: true },
    date: { type: Date, default: Date.now },
    image: { type: String, trim: true },
    hasPassword: { type: Boolean, default: false },
    role: {
      type: String,
      required: true,
      default: "user",
      enum: ["admin", "user"],
    },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Activity" }],
    basket: [
      {
        activityId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Activity",
          required: true,
        },
        seat:seatSchema,
        price: { type: Number }
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
