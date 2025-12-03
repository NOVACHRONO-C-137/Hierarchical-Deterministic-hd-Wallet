const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const Wallet = require("./models/wallet.js");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Simple health check
app.get("/", (req, res) => {
  res.json({ message: "Wallet API is running" });
});

// Get wallets for a session
app.get("/api/wallets", async (req, res) => {
  try {
    const { sessionId } = req.query;
    if (!sessionId) {
      return res.status(400).json({ error: "sessionId is required" });
    }

    const wallets = await Wallet.find({ sessionId }).sort({ index: 1 });
    res.json(wallets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Create a wallet record
app.post("/api/wallets", async (req, res) => {
  try {
    const { sessionId, label, address, publicKey, index } = req.body;

    if (!sessionId || !label || !address || !publicKey || index === undefined) {
      return res.status(400).json({
        error: "sessionId, label, address, publicKey, index are required",
      });
    }

    const wallet = new Wallet({ sessionId, label, address, publicKey, index });
    await wallet.save();
    res.status(201).json(wallet);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
