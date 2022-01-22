const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true }, // String is shorthand for {type: String}
  userName: { type: String, required: true, unique: true },
  gender: String,
  dob: Date,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now },
  isAdmin: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", userSchema);
