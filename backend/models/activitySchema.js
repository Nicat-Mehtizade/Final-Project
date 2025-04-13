const mongoose = require("mongoose");

const activitySchema = mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    genre: { type: String, required: true, trim: true },
    tag: { type: String, required: true, trim: true },
    date: { type: Date, default: Date.now },
    image: { type: String, required: true },
    language: { type: String, required: true, trim: true },
    price: [{ type: Number, required: true }],
    ageLimit: { type: Number, trim: true },
    showtimes: [
      {
        startTime: { type: Date, required: true },
        endTime: { type: Date, required: true },
      },
    ],
    location: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Activity = mongoose.model("Activity", activitySchema);
module.exports = Activity;
