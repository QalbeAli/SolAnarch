"use client";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

// Import default styles and override them
import "@solana/wallet-adapter-react-ui/styles.css";

const SolanaWallet = () => {
  return (
    <WalletMultiButton
      style={{
        borderRadius: "50px",
        background: "linear-gradient(to right, #B45309, #78350F)",
        color: "white",
        fontWeight: "bold",
        fontSize: "16px",
        padding: "10px 20px",
      }}
    />
  );
};

export default SolanaWallet;
