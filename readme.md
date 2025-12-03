# **Hierarchical Deterministic (HD) Wallet — Visual Demo**

A simple and interactive React-based application that demonstrates how **HD (Hierarchical Deterministic) wallets** work.  
It shows how a single **BIP39 seed phrase** can generate multiple deterministic wallets using standard derivation paths.

👉 **Live Demo:** *(Add your deployed link here)*  
Example: `https://your-demo-url.vercel.app/`

---

## 🚀 Features

### 🔐 **Seed Phrase Generation / Input**
- Enter your own seed phrase **or** let the app generate a secure 12-word mnemonic.
- Seed validation included.
- The same seed is reused to derive all wallets for the session.

---

### 🪪 **Create Multiple HD Wallets**
Each wallet is derived from the path:

```
m/44'/60'/0'/0/i
```

Where **i** increases for every new wallet.  
Each generated wallet contains:

- Public Address  
- Public Key  
- Private Key (hidden by default)  
- Optional custom label
  
---


## 🎯 Purpose of This Project
This project is a **visual learning tool** to help users understand:

- The meaning of a seed phrase  
- How many wallets can come from a single phrase  
- Why wallet recovery works  
- Public key vs private key  
- What derivation paths are  
- How modern multi-chain wallets manage addresses  

It makes complex cryptography concepts simple and intuitive.
---

