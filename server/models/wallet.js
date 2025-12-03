const mongoose = require("mongoose");

const WalletSchema = new mongoose.Schema(
  {
    sessionId: { type: String, required: true },
    label: { type: String, required: true },
    address: { type: String, required: true },
    publicKey: { type: String, required: true },
    index: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Wallet", WalletSchema);
