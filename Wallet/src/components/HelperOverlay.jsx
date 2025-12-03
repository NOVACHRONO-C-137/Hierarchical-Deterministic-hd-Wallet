import React, { useState } from "react";
import Lottie from "lottie-react";
import "../App.css";
import helperAnimation from "../assets/wired-flat-112-book.json";
import searchAnimation from "../assets/wired-flat-19-magnifier-zoom-search-hover-spin.json";
import overviewAnimation from "../assets/wired-flat-1414-circle-hover-pinch.json";
function HelperModal({ open, onClose, title, children }) {
  if (!open) return null;

  return (
    <div className="helper-modal-backdrop" onClick={onClose}>
      <div className="helper-modal" onClick={(e) => e.stopPropagation()}>
        <button
          className="helper-modal-close"
          type="button"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        {title && <h3 className="helper-modal-title">{title}</h3>}

        <div className="helper-modal-body">{children}</div>
      </div>
    </div>
  );
}

export default function HelperOverlay() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="helper-fab"
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="What is this app?"
      >
        <Lottie
          animationData={helperAnimation}
          loop
          autoplay
          className="helper-fab-lottie"
        />
      </button>

      <HelperModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title="OVERVIEW"
      >
        <Lottie
          animationData={overviewAnimation}
          autoplay
          className="icon-lottie2"
        />
        <p>
          Thank you for stopping by and checking out this project. This project
          is a <strong>visual lab</strong> to understand how{" "}
          <strong>hierarchical deterministic (HD) wallets</strong> work.
        </p>
        <p>
          Hierarchical Deterministic (HD) wallets are a type of wallet that can
          generate a tree of key pairs from a <strong>single seed</strong>. This
          allows for the generation of multiple addresses from a{" "}
          <strong>single root seed</strong>, providing both security and
          convenience.
        </p>
        <ul>
          <li>
            When you click <strong>Add Wallet</strong>, it derives a wallet with
            unique key pair from the path{" "}
            <strong>
              <code>m/44&apos;/60&apos;/0&apos;/0/i</code>
            </strong>
            .
          </li>
          <li>The keys and addresses can be organized into a tree.</li>
          <li>The keys and addresses are always generated in the same way.</li>
        </ul>
        <p className="bottom-helper-text">
          So basically, an HD Wallet allows generation of billions of private
          keys using a single seed. So as long as the user remember the seed, it
          is possible to recover the same keys and addresses.
        </p>
        <div style={{ display: "flex" }}>
          <a
            href="https://learnmeabitcoin.com/technical/keys/hd-wallets/"
            style={{
              color: "#60a5fa",
              textDecoration: "none",
              cursor: "pointer",
              transition: "0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.color = "#f97316";
              e.target.style.textDecoration = "underline";
              e.target.style.textDecorationColor = "#f97316";
            }}
            onMouseLeave={(e) => {
              e.target.style.color = "#60a5fa";
              e.target.style.textDecoration = "none";
            }}
          >
            For more info
          </a>
          <Lottie
            animationData={searchAnimation}
            loop
            autoplay
            className="icon-lottie1"
          />
        </div>
      </HelperModal>
    </>
  );
}
