const mongoose = require("mongoose");

const hallSchema = mongoose.Schema({
  name: { type: String, required: true },
  locationText: { type: String, required: true },
  rows: { type: Number, required: true },
  cols: { type: Number, required: true },
});

module.exports = mongoose.model("Hall", hallSchema);
