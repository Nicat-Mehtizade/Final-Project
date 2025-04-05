const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    date: { type: Date, default: Date.now },
    image: {type:String,trim:true},
    role: {
      type: String,
      required: true,
      default: "user",
      enum: ["admin", "user"],
    },
    wishlist: [
      {
        activityId: { type: mongoose.Schema.Types.ObjectId, ref: "Activity",required: true },
      },
    ],
    basket: [
      {
        activityId: { type: mongoose.Schema.Types.ObjectId, ref: "Activity",required: true },
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
