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
- Click the visible seed phrase to **copy** it to clipboard.

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

Smooth slide-in animation for each newly created wallet.

---

### 👁️ **Sensitive Data Controls**
Toggle visibility for:

- **Private Key**
- **Seed Phrase**

Sensitive information is masked by default.

---

### 🗑️ **Delete Wallets Individually or Clear All**
- Delete a single wallet → plays a smooth fade-out animation.
- Clear all wallets → triggers a wipe animation.
- Toast notifications confirm all actions.

The seed phrase remains unchanged unless the user enters a new one.

---

### 🧠 **Built-In Helper Modal (Animated)**
A floating animated Lottie icon opens a modal explaining:

- What HD wallets are  
- How seed phrases generate keys  
- How derivation paths work  
- Why HD wallets allow infinite deterministic addresses  

Includes animated icons + an educational link.

---

### 🌙 **Dark & Light Theme Switch**
- Full theme toggle  
- Smooth transitions  
- Every component adapts to the active theme  
- Fully mobile-responsive UI

---

### 🔔 **Toast Notifications**
Using `react-hot-toast` for:

- Success messages  
- Error alerts  
- Copy confirmations  
- Wallet operations  

Toasts match the selected theme automatically.

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

## ⭐ **If you like this project, please consider starring the repo!**

