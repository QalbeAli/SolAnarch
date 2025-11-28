"use client";
import React, { useMemo } from "react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { LedgerWalletAdapter } from "@solana/wallet-adapter-ledger";
import { SolflareWalletAdapter } from "@solana/wallet-adapter-solflare";
import { WalletConnectWalletAdapter } from "@solana/wallet-adapter-walletconnect";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { Toaster } from "@/components/ui/toaster";
export function WalletContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new LedgerWalletAdapter(),
      new SolflareWalletAdapter(),
      new WalletConnectWalletAdapter({
        network: WalletAdapterNetwork.Devnet,
        options: {
          projectId: "df952832de2940f86aef97c2279d298f", // public identifier, plus goes to client side. So safe to expose/hardcode
        },
      }),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {children}
          <Toaster />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
