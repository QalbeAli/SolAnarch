import { Cluster } from "@solana/web3.js";
import React from "react";

interface SolanaExplorerLinkProps {
  tx: string;
  cluster?: Cluster; // Optional cluster prop
}

export const SolanaExplorerLink: React.FC<SolanaExplorerLinkProps> = ({
  tx,
  cluster = "devnet", // Default to devnet
}) => {
  const url = `https://explorer.solana.com/tx/${tx}?cluster=${cluster}`;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 underline"
    >
      View on Solana Explorer
    </a>
  );
};
