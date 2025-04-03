const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  activity: { type: mongoose.Schema.Types.ObjectId, ref: "Activity" },
  date: { type: Date, default: Date.now },
  text: { type: String, required: true, trim: true },
});

const Comment=mongoose.model("Comment", commentSchema)
module.exports=Comment
