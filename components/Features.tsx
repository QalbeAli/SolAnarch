"use client";
import React from "react";
import { motion } from "framer-motion";
import { Shield, Zap, LineChart, Coins, Lock, Cpu } from "lucide-react";

const Features = () => {
  const features = [
    {
      title: "Quantum-Resistant Security",
      description:
        "Advanced lattice-based cryptography protecting against quantum computing threats.",
      icon: <Shield className="w-10 h-10 text-primary" />,
    },
    {
      title: "High-Speed Transactions",
      description:
        "Ultra-fast and cost-efficient transactions powered by the Solana blockchain.",
      icon: <Zap className="w-10 h-10 text-secondary" />,
    },
    {
      title: "AI-Driven Trading",
      description:
        "Advanced algorithmic trading system with real-time market analysis and execution.",
      icon: <LineChart className="w-10 h-10 text-button" />,
    },
    {
      title: "Cross-Chain Compatibility",
      description:
        "Seamless integration with major blockchain networks and payment gateways.",
      icon: <Coins className="w-10 h-10 text-primary" />,
    },
    {
      title: "Secure Wallet Infrastructure",
      description:
        "Multi-signature and biometric authentication for enhanced security.",
      icon: <Lock className="w-10 h-10 text-secondary" />,
    },
    {
      title: "Smart Contract Capabilities",
      description:
        "Advanced dApps and automated transactions powered by quantum-resistant algorithms.",
      icon: <Cpu className="w-10 h-10 text-button" />,
    },
  ];

  return (
    <div className="space-y-6" id="features">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          SolAnarch Features
        </h1>
        <p className="text-gray-600 text-lg">
          Solana's first Layer 2 chain combining infinite scalability with
          multi-chain compatibility.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:border-primary/50 transition-colors"
          >
            <div className="flex items-center mb-3">
              <div className="p-2 rounded-lg bg-primary/10 border border-primary/30">
                {feature.icon}
              </div>
              <h2 className="text-lg font-bold text-gray-900 ml-3">
                {feature.title}
              </h2>
            </div>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Features;
