"use client";
import React from "react";
import { motion } from "framer-motion";

const FAQ = () => {
  const faqs = [
    {
      question: "What is SolAnarch ($SOLA)?",
      answer:
        "SolAnarch is a revolutionary Layer 2 solution for Solana, combining meme coin culture with serious blockchain technology. It's designed to unlock the full potential of the Solana ecosystem with unmatched scalability.",
    },
    {
      question: "How does SolAnarch work?",
      answer:
        "SolAnarch operates as a Layer 2 chain on Solana, providing infinite scalability and multi-chain compatibility. It enables faster transactions and lower fees while maintaining the security of the Solana network.",
    },
    {
      question: "What makes SolAnarch different?",
      answer:
        "SolAnarch is Solana's first Layer 2 chain, offering infinite scale, multi-chain compatibility, and the best meme coin experience. It's built to redefine Solana's capabilities while maintaining a fun, community-driven approach.",
    },
    {
      question: "How is the presale structured?",
      answer:
        "The presale consists of multiple phases with different pricing tiers. Each phase offers tokens at a specific price point, allowing early supporters to participate at the best rates.",
    },
    {
      question: "What are the tokenomics?",
      answer:
        "SolAnarch has a carefully designed tokenomics model that ensures sustainable growth. Details about distribution, staking rewards, and token allocation can be found in the Tokenomics section.",
    },
    {
      question: "How can I participate in staking?",
      answer:
        "Staking rewards are available for $SOLA token holders. You can stake your tokens to earn up to 56% APY. Staking functionality will be available after the presale concludes.",
    },
    {
      question: "What payment methods are accepted?",
      answer:
        "You can purchase $SOLA using SOL, ETH, BNB, USDT, USDC, or credit card. Simply select your preferred payment method in the presale card.",
    },
    {
      question: "What are the investment risks?",
      answer:
        "Like all cryptocurrencies, SolAnarch carries risks including market volatility, regulatory changes, and potential technology vulnerabilities. Always conduct your own research before investing. This is not financial advice.",
    },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-gray-600 text-lg">
          Learn more about SolAnarch&apos;s features, technology, and investment
          opportunities.
        </p>
      </motion.div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={faq.question}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-primary/50 transition-colors"
          >
            <h2 className="text-lg font-semibold text-primary mb-2">
              {faq.question}
            </h2>
            <p className="text-gray-600 text-sm">{faq.answer}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
