const mongoose = require("mongoose");
const { Schema } = mongoose;

const noteSchema = new Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: { type: String, required: true },
  description: {
    type: String,
    default: "Empty: User needs to add a description here",
  },
  tag: { type: String, default: "General" },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("note", noteSchema);
