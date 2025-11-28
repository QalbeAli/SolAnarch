"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Wallet,
  Coins,
  CreditCard,
  ShoppingCart,
  CheckCircle,
} from "lucide-react";

const HowToBuy = () => {
  const steps = [
    {
      id: 1,
      title: "Choose a Wallet",
      description:
        "Recommended wallets include Phantom, Solflare, and Trust Wallet for Solana. For other chains, use MetaMask or Coinbase Wallet.",
      icon: <Wallet className="w-8 h-8 text-primary" />,
    },
    {
      id: 2,
      title: "Acquire Cryptocurrency",
      description:
        "You'll need SOL, ETH, BNB, USDT, or USDC to buy SolAnarch tokens. You can also use a credit card through our payment gateway.",
      icon: <Coins className="w-8 h-8 text-secondary" />,
    },
    {
      id: 3,
      title: "Connect Your Wallet",
      description:
        "Click 'Connect Wallet' in the presale card and follow the prompts to authorize the connection.",
      icon: <CreditCard className="w-8 h-8 text-primary" />,
    },
    {
      id: 4,
      title: "Select Payment Method",
      description:
        "Choose your preferred payment method (SOL, ETH, BNB, USDT, USDC, or Credit Card) from the dropdown in the presale card.",
      icon: <ShoppingCart className="w-8 h-8 text-secondary" />,
    },
    {
      id: 5,
      title: "Participate in the Presale",
      description:
        "Enter the amount you want to invest and click 'Buy $SOLA'. Review the transaction details carefully.",
      icon: <ShoppingCart className="w-8 h-8 text-primary" />,
    },
    {
      id: 6,
      title: "Complete the Transaction",
      description:
        "Review and approve the transaction in your wallet. Your SolAnarch tokens will appear in your wallet after confirmation.",
      icon: <CheckCircle className="w-8 h-8 text-green-500" />,
    },
  ];

  return (
    <div className="relative overflow-hidden">
      <Image
        src="/images/standing.png"
        alt="SolAnarch how to buy background"
        fill
        className="object-cover opacity-20 md:opacity-25 pointer-events-none select-none"
      />
      <div className="relative space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            How to Buy SolAnarch ($SOLA) Tokens
          </h1>
          <p className="text-gray-600 text-lg">
            Follow these simple steps to join the presale and own your SolAnarch tokens.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
                  {step.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-semibold text-primary">STEP {step.id}</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    {step.title}
                  </h2>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mt-8"
        >
          <h3 className="text-lg font-bold text-yellow-700 mb-3">
            Troubleshooting Tips:
          </h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
            <li>
              <span className="font-semibold">Transaction Not Showing:</span>{" "}
              Wait a few minutes and refresh the page. Check your wallet for pending transactions.
            </li>
            <li>
              <span className="font-semibold">Still Not Working?</span> Clear
              your browser cache or try using a different browser. Make sure you have enough funds for gas fees.
            </li>
            <li>
              <span className="font-semibold">Credit Card Issues:</span> Ensure your card supports cryptocurrency purchases. Some banks may block these transactions.
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default HowToBuy;

