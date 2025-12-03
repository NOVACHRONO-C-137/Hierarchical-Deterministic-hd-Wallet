import React, { useState } from "react";
import { ethers } from "ethers";
import { createWallet } from "./api";
import "./App.css";
import toast, { Toaster } from "react-hot-toast";
import HelperOverlay from "./components/HelperOverlay";

const ICON_EYE_OPEN = "/show.svg";
const ICON_EYE_CLOSED = "/hide.svg";
const COPY_ICON = "/copy.svg";
const BIN_ICON = "/bin.svg";
const WALLET_ICON_HEADER = "/wallet2.svg";
const ICON_THEME_LIGHT = "/sun.svg";
const ICON_THEME_DARK = "/moon.svg";

const createSessionId = () => crypto.randomUUID();

export default function App() {
  const [sessionId] = useState(createSessionId);
  const [mnemonic, setMnemonic] = useState("");
  const [inputMnemonic, setInputMnemonic] = useState("");
  const [wallets, setWallets] = useState([]);
  const [walletLabel, setWalletLabel] = useState("");
  const [isPhraseVisible, setIsPhraseVisible] = useState(false);
  const [theme, setTheme] = useState("light");

  // Add wallet
  const handleAddWalletClick = async () => {
    try {
      let phrase = mnemonic;

      // if user typed a phrase and we don't yet have one, validate & use it
      if (!phrase && inputMnemonic.trim()) {
        const candidate = inputMnemonic.trim();
        const isValid = ethers.utils.isValidMnemonic(candidate);
        if (!isValid) {
          toast.error("The seed phrase you entered is invalid.");
          return;
        }
        phrase = candidate;
      }

      // generate a phrase if still none
      if (!phrase) {
        const randomWallet = ethers.Wallet.createRandom();
        phrase = randomWallet.mnemonic.phrase;
      }

      // lock mnemonic for session
      setMnemonic(phrase);
      setInputMnemonic("");

      const nextDisplayIndex = wallets.length + 1;

      const nextHdIndex =
        wallets.length === 0
          ? 0
          : wallets.reduce((max, w) => (w.index > max ? w.index : max), -1) + 1;

      const path = `m/44'/60'/0'/0/${nextHdIndex}`;
      const wallet = ethers.Wallet.fromMnemonic(phrase, path);

      const trimmedLabel = walletLabel.trim();
      const isCustomLabel = trimmedLabel.length > 0;

      const backendLabel = isCustomLabel
        ? trimmedLabel
        : `Wallet ${nextDisplayIndex}`;

      createWallet({
        sessionId,
        label: backendLabel,
        address: wallet.address,
        publicKey: wallet.publicKey,
        index: nextHdIndex,
      }).catch((err) => console.error("Backend createWallet error:", err));

      const id = crypto.randomUUID();
      const uiWallet = {
        id,
        label: trimmedLabel,
        autoLabel: !isCustomLabel,
        address: wallet.address,
        publicKey: wallet.publicKey,
        privateKey: wallet.privateKey,
        index: nextHdIndex,
        showPrivate: false,
        showPhrase: false,
        entering: true,
        removing: false,
      };

      setWallets((prev) => [...prev, uiWallet]);
      setWalletLabel("");

      setTimeout(() => {
        setWallets((prev) =>
          prev.map((w) => (w.id === id ? { ...w, entering: false } : w))
        );

        const el = document.getElementById(`wallet-${id}`);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 30);

      toast.success(`Wallet ${nextDisplayIndex} created`);
    } catch (err) {
      console.error("Error adding wallet:", err);
      toast.error("Failed to generate or add wallet.");
    }
  };

  const handleSeedKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddWalletClick();
    }
  };

  const handleCopyMnemonic = async () => {
    if (!mnemonic) return;
    try {
      await navigator.clipboard.writeText(mnemonic);
      toast.success("Seed phrase copied");
    } catch {
      toast.error("Failed to copy.");
    }
  };

  const handleClearWallets = () => {
    if (wallets.length === 0) {
      toast("No wallets to clear");
      return;
    }
    setWallets((prev) => prev.map((w) => ({ ...w, removing: true })));
    setTimeout(() => {
      setWallets([]);
      toast.success("All wallets deleted");
    }, 350);
  };

  const handleDeleteWallet = (id) => {
    setWallets((prev) =>
      prev.map((w) => (w.id === id ? { ...w, removing: true } : w))
    );
    setTimeout(() => {
      setWallets((prev) => prev.filter((w) => w.id !== id));
      toast.success("Wallet removed");
    }, 320);
  };

  const toggleWalletFlag = (id, key) => {
    setWallets((prev) =>
      prev.map((w) => (w.id === id ? { ...w, [key]: !w[key] } : w))
    );
  };

  const toggleTheme = () => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  };

  return (
    <div className={`app-root theme-${theme}`}>
      <div className="app-shell">
        <header className="app-header">
          <div>
            <h1 className="brand-title">
              <img
                src={WALLET_ICON_HEADER}
                alt="icon-svg"
                className="icon-big"
              />
              HEIRARCHICAL DETERMINISTIC (HD) WALLET
              <span>
                <button
                  className="theme-toggle"
                  type="button"
                  onClick={toggleTheme}
                  aria-label={
                    theme === "dark"
                      ? "Switch to light mode"
                      : "Switch to dark mode"
                  }
                >
                  <img
                    src={theme === "dark" ? ICON_THEME_LIGHT : ICON_THEME_DARK}
                    alt="sun-moon-svg"
                    className="theme-toggle-icon"
                  />
                </button>
              </span>
            </h1>
            <p className="brand-subtitle">
              A simple project for understanding derived paths via single seed
              phrase
            </p>
          </div>
        </header>

        <section className="card card-secret">
          <div className="row gap">
            <input
              className="input grow"
              placeholder={
                mnemonic
                  ? "Seed generated, you can continue adding wallet from this seed phrase."
                  : "Enter your seed phrase (or leave blank to generate)"
              }
              value={inputMnemonic}
              onChange={(e) => setInputMnemonic(e.target.value)}
              onKeyDown={handleSeedKeyDown}
              disabled={!!mnemonic}
            />
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleAddWalletClick}
            >
              Add Wallet
            </button>
          </div>

          <div className="secret-block">
            <div className="secret-header">
              <span>Current Seed Phrase</span>
              <button
                className="btn-ghost"
                type="button"
                onClick={() => setIsPhraseVisible((v) => !v)}
              >
                {isPhraseVisible ? "Hide" : "Show"}
              </button>
            </div>
            <div className="secret-body">
              {mnemonic ? (
                <>
                  <div
                    className={
                      "mnemonic-wrapper " +
                      (isPhraseVisible
                        ? "mnemonic-wrapper-visible"
                        : "mnemonic-wrapper-hidden")
                    }
                    onClick={isPhraseVisible ? handleCopyMnemonic : undefined}
                  >
                    <div className="mnemonic-grid">
                      {mnemonic.split(" ").map((word, idx) => (
                        <div className="mnemonic-word" key={idx}>
                          {word}
                        </div>
                      ))}
                    </div>
                    <div className="mnemonic-copy-hint">
                      <img
                        src={COPY_ICON}
                        alt="copy-svg"
                        className="icon-small"
                      />
                      Click anywhere to copy
                    </div>
                  </div>

                  {!isPhraseVisible && (
                    <span className="secret-dots">•••••• •••••• ••••••</span>
                  )}
                </>
              ) : (
                <span className="secret-placeholder">
                  No seed phrase yet. Generate or enter one above.
                </span>
              )}
            </div>
          </div>
        </section>

        {/* Vault */}
        <section className="card card-vault">
          <div className="vault-header">
            <div>
              <h2 className="vault-title">Vault</h2>
              <p className="vault-subtitle">
                All wallets derived from the current seed phrase
              </p>
            </div>
            <div className="row gap">
              <input
                className="input input-small"
                placeholder="Wallet unique label or name"
                value={walletLabel}
                onChange={(e) => setWalletLabel(e.target.value)}
              />
              <button
                className="btn btn-outline"
                type="button"
                onClick={handleClearWallets}
              >
                Clear Wallets
              </button>
            </div>
          </div>

          {wallets.length === 0 ? (
            <div className="vault-empty">
              No wallets yet. Click <strong>Add Wallet</strong> to derive one
              from the current seed phrase.
            </div>
          ) : (
            <div className="wallet-list">
              {wallets.map((w, idx) => {
                const displayNumber = idx + 1;
                const showCustomLabel = !w.autoLabel && w.label;

                const classes = ["wallet-card", w.removing ? "removing" : ""]
                  .filter(Boolean)
                  .join(" ");

                return (
                  <div id={`wallet-${w.id}`} key={w.id} className={classes}>
                    <div className="wallet-card-header">
                      <div className="wallet-name">
                        {showCustomLabel ? (
                          <>
                            Wallet {displayNumber} —{" "}
                            <span className="wallet-label">{w.label}</span>
                          </>
                        ) : (
                          <>Wallet {displayNumber}</>
                        )}
                      </div>
                      <button
                        className="wallet-delete"
                        type="button"
                        onClick={() => handleDeleteWallet(w.id)}
                      >
                        <img
                          src={BIN_ICON}
                          alt="bin-svg"
                          className="icon-small"
                        />
                      </button>
                    </div>

                    <div className="wallet-field">
                      <div className="wallet-field-label">Public Key</div>
                      <div className="wallet-field-value">{w.publicKey}</div>
                    </div>

                    <div className="wallet-field">
                      <div className="wallet-field-label">Private Key</div>
                      <div className="wallet-reveal-row">
                        <span className="wallet-field-value wallet-private">
                          {w.showPrivate
                            ? w.privateKey
                            : "••••••••••••••••••••••••••••••••••••••••"}
                        </span>
                        <button
                          className="reveal-icon-btn"
                          type="button"
                          onClick={() => toggleWalletFlag(w.id, "showPrivate")}
                          aria-label={
                            w.showPrivate
                              ? "Hide private key"
                              : "Show private key"
                          }
                        >
                          <img
                            src={
                              w.showPrivate ? ICON_EYE_CLOSED : ICON_EYE_OPEN
                            }
                            alt="eye-svg"
                            className="icon-small"
                          />
                        </button>
                      </div>
                    </div>

                    <div className="wallet-field wallet-field-muted">
                      <div className="wallet-field-label">Seed Phrase</div>
                      <div className="wallet-reveal-row">
                        <span className="wallet-field-value">
                          {w.showPhrase
                            ? mnemonic
                            : "••••••••••••••••••••••••••••••••••••••••"}
                        </span>
                        <button
                          className="reveal-icon-btn"
                          type="button"
                          onClick={() => toggleWalletFlag(w.id, "showPhrase")}
                          aria-label={
                            w.showPhrase
                              ? "Hide secret phrase"
                              : "Show secret phrase"
                          }
                        >
                          <img
                            src={w.showPhrase ? ICON_EYE_CLOSED : ICON_EYE_OPEN}
                            alt="eye-svg"
                            className="icon-small"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
      <HelperOverlay />
      <Toaster
        position="center-top"
        toastOptions={{
          style: {
            background: theme === "dark" ? "#020617" : "#ffffff",
            color: theme === "dark" ? "#f9fafb" : "#111827",
            border:
              theme === "dark" ? "1px solid #4b5563" : "1px solid #e5e7eb",
            fontSize: "1.3rem",
          },
          success: {
            iconTheme: {
              primary: "#22c55e",
              secondary: theme === "dark" ? "#020617" : "#ffffff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: theme === "dark" ? "#020617" : "#ffffff",
            },
          },
        }}
      />
    </div>
  );
}
