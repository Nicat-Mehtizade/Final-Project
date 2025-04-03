const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    date: { type: Date, default: Date.now },
    role: {
      type: String,
      required: true,
      default: "user",
      enum: ["admin", "user"],
    },
    likes: [
      {
        activityId: { type: mongoose.Schema.Types.ObjectId, ref: "Activity" },
        required: true,
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
