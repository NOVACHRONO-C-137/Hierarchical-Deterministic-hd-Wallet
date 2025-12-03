# **Hierarchical Deterministic (HD) Wallet — Visual Demo**

A simple and interactive React-based application that demonstrates how **HD (Hierarchical Deterministic) wallets** work.  
It shows how a single **BIP39 seed phrase** can generate multiple deterministic wallets using standard derivation paths.




---

# 🔐 Understanding Mnemonics, HD Wallets & Derivation Paths  
*A simple explanation for how this HD Wallet app works.*

---

## 🧠 1. What Is a Mnemonic Phrase?

A **mnemonic phrase** (12 or 24 words) is a human-readable encoding of random entropy.  
It follows the **BIP39** standard.

Example:

```
gravity machine north sort system school ...
```

This phrase is NOT a private key—it's just a readable way to store randomness.

---

## 🔧 2. Mnemonic → Seed

The mnemonic is converted into a **512-bit seed** using PBKDF2 hashing:

```
seed = PBKDF2(mnemonic, "mnemonic" + optionalPassphrase)
```

This **seed** becomes the root of your entire wallet system.

---

## 🌳 3. Seed → HD Wallet (BIP32)

Using the BIP39 seed, BIP32 creates:

- A **master private key**
- A **master chain code**

From this root, the wallet can deterministically derive **infinite** child keys.

Example:

```
Master Key (m)
 └─ /44'/60'/0'/0/0   → Wallet #1
 └─ /44'/60'/0'/0/1   → Wallet #2
 └─ /44'/60'/0'/0/2   → Wallet #3
```

This app demonstrates this visually.

---

## 📍 4. What Does the Path `m/44'/60'/0'/0/i` Mean?

This is the standard Ethereum derivation path.

Breakdown:

| Segment | Meaning | Description |
|--------|---------|-------------|
| **m** | Master node | Root key from seed |
| **44'** | BIP44 | Multi-account standard |
| **60'** | Coin type | `60` = Ethereum |
| **0'** | Account index | First account |
| **0** | External chain | Used for public addresses |
| **i** | Wallet index | 0,1,2… derived wallets |

In this app:  
When the user clicks **Add Wallet**, the next index `i` is generated automatically.

---

## 🎯 5. Different Blockchains Use Different Paths

BIP44 assigns each chain a unique **coin type**.

### **Ethereum**
```
m/44'/60'/0'/0/i
```

Used by MetaMask, Ledger, Avalanche C-Chain, Polygon, BSC, etc.

---

### **Bitcoin**
```
m/44'/0'/0'/0/i     (Legacy)
m/49'/0'/0'/0/i     (P2SH SegWit)
m/84'/0'/0'/0/i     (Native SegWit)
```

Bitcoin has multiple formats → different derivation standards.

---

### **Solana**  
Solana does **not** use BIP32 secp256k1.  
Uses ed25519 derivation (SLIP-0010):

```
m/44'/501'/0'/0'
```

---

### **Cardano**
```
m/1852'/1815'/0'/0/0
```

---

### **Near**
```
m/44'/397'/0'
```

---

### **Avalanche (C-Chain)**
EVM-compatible → same as Ethereum:

```
m/44'/60'/0'/0/i
```

---

## 🔑 6. Public Key vs Private Key vs Address

### **Private Key**
- 32 bytes  
- Must remain secret  
- Controls the wallet

### **Public Key**
- Derived from the private key  
- 64 bytes (x + y coordinates)  
- Very long compared to private key  

### **Address**
- Last 20 bytes of the Keccak-256 hash of the public key  
- Short, user-friendly  
- What you share with others

```
Private Key → Public Key → Address
```

This app correctly displays all three (with toggles for private key & mnemonic safety).

---

## 🧩 7. Why Public Keys Look Longer

- **Private key:** 32 bytes  
- **Public key:** 64 bytes  
- **Address:** 20 bytes  

Public keys must encode more elliptic curve information, hence the longer hex string.

---

## 🎉 Summary of How Your App Works

- User generates or inputs a **mnemonic**  
- The mnemonic produces a **seed**  
- The app derives wallets using:
  ```
  m/44'/60'/0'/0/i
  ```
- Each click on **Add Wallet** increments `i`  
- Each derived wallet has:
  - A **unique private key**
  - A **unique public key**
  - A **unique wallet address**  
- Deleting wallets renumbers display labels but *keeps derivation order consistent*  
- All keys are generated **locally** using the `ethers.js` library  
- Nothing sensitive is ever sent to MongoDB — only public info and labels

---

## 🔗 Useful References

- BIP39: https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki  
- BIP32: https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki  
- BIP44: https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki  
- Ethereum Derivation: https://eips.ethereum.org/EIPS/eip-85  




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

