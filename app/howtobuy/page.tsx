"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Wallet,
  Coins,
  CreditCard,
  ShoppingCart,
  CheckCircle,
} from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Choose a Wallet",
    description:
      "Recommended wallets include MetaMask, Trust Wallet, and Coinbase.",
    icon: <Wallet className="w-8 h-8 text-primary" />,
  },
  {
    id: 2,
    title: "Acquire Cryptocurrency",
    description:
      "You'll need ETH, USDT, USDC, or BNB to buy Arctic Pablo tokens.",
    icon: <Coins className="w-8 h-8 text-secondary" />,
  },
  {
    id: 3,
    title: "Connect Your Wallet",
    description:
      "Click 'Connect Wallet' and follow the prompts to authorize the connection.",
    icon: <CreditCard className="w-8 h-8 text-heading" />,
  },
  {
    id: 4,
    title: "Participate in the Presale",
    description:
      "Enter the amount of Arctic Pablo tokens to purchase and click 'Buy'.",
    icon: <ShoppingCart className="w-8 h-8 text-button" />,
  },
  {
    id: 5,
    title: "Complete the Transaction",
    description:
      "Review and approve the transaction in your wallet. Your Arctic Pablo tokens will appear on your dashboard.",
    icon: <CheckCircle className="w-8 h-8 text-green-500" />,
  },
];

const HowToBuy = () => {
  return (
    <div className="min-h-screen px-8 pb-16 pt-32 ">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-extrabold text-white mb-4">
          How to Buy Arctic PIPIN Tokens
        </h1>
        <p className="text-gray-600">
          Follow these simple steps to join the presale and own your Arctic
          Pablo tokens.
        </p>
      </motion.div>

      <div className="max-w-5xl mx-auto space-y-12">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2, duration: 0.8 }}
            className={`flex items-center gap-6 ${
              index % 2 === 0 ? "flex-row" : "flex-row-reverse"
            }`}
          >
            <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center">
              {step.icon}
            </div>
            <div className="flex-grow bg-white rounded-lg p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-primary mb-2">
                Step {step.id}: {step.title}
              </h2>
              <p className="text-gray-700">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-yellow-100 border-l-4 border-yellow-400 p-4 rounded-lg"
        >
          <h3 className="text-lg font-bold text-yellow-700">
            Troubleshooting Tips:
          </h3>
          <ul className="list-disc list-inside text-gray-700">
            <li>
              <span className="font-semibold">Transaction Not Showing:</span>{" "}
              Wait a few minutes and refresh the site.
            </li>
            <li>
              <span className="font-semibold">Still Not Working?</span> Clear
              your cache or switch to a different browser.
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default HowToBuy;
