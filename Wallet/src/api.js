import axios from "axios";

// adjust if your backend port is different
const API_BASE_URL = "http://localhost:5500";

// Get all wallets for a session
export async function getWallets(sessionId) {
  try {
    const res = await axios.get(`${API_BASE_URL}/api/wallets`, {
      params: { sessionId },
    });
    const data = res.data;
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("getWallets error:", err);
    return [];
  }
}

// Create one wallet record
export async function createWallet(payload) {
  try {
    const res = await axios.post(`${API_BASE_URL}/api/wallets`, payload);
    return res.data;
  } catch (err) {
    console.error("createWallet error:", err);
    throw err;
  }
}
