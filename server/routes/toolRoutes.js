const express = require("express");
const router = express.Router();
const Tool = require("../models/toolModel");

// GET all tools
router.get("/", async (req, res) => {
  const tools = await Tool.find();
  res.json(tools);
});

// POST add new tool
router.post("/", async (req, res) => {
  const newTool = new Tool(req.body);
  await newTool.save();
  res.json({ message: "Tool added ✅" });
});

// PUT update tool
router.put("/:id", async (req, res) => {
  await Tool.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Tool updated ✅" });
});

// DELETE remove tool
router.delete("/:id", async (req, res) => {
  await Tool.findByIdAndDelete(req.params.id);
  res.json({ message: "Tool deleted 🗑️" });
});

module.exports = router;
