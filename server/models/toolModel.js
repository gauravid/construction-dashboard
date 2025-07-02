const mongoose = require("mongoose");

const toolSchema = new mongoose.Schema({
  name: String,
  toolId: String,
  assignedTo: String,
  status: String, // Available, In Use, Damaged
  usageHours: Number,
  lastServiced: Date,
  location: String
});

module.exports = mongoose.model("Tool", toolSchema);
