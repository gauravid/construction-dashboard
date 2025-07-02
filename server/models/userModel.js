const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  role: String, // admin or worker
  email: String,
  password: String // optional
});

module.exports = mongoose.model("User", userSchema);
