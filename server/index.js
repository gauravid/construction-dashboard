require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
console.log("📦 MONGO_URI is:", process.env.MONGO_URI);

const toolRoutes = require("./routes/toolRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/tools", toolRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("🚀 Backend is running");
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
  })
  .catch(err => console.error("MongoDB connection error:", err));
