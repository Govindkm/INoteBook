const mongoose = require("mongoose");
const { Schema } = mongoose;

const noteSchema = new Schema({
  title: { type: String, required: true },
  description: {
    type: String,
    required: true,
    default: "Empty: User needs to add a description here",
  },
  tag: { type: String, default: "General" },
});

module.exports = mongoose.model("note", noteSchema);
