"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const recentHeadlines = [
  {
    title: "Solana Ecosystem Sees Massive Growth in 2025",
    source: "CoinDesk",
    url: "https://www.coindesk.com",
  },
  {
    title: "Layer 2 Solutions Revolutionize Blockchain Scalability",
    source: "The Block",
    url: "https://www.theblock.co",
  },
  {
    title: "Meme Coins Continue to Dominate Crypto Markets",
    source: "Decrypt",
    url: "https://decrypt.co",
  },
  {
    title: "Solana-Based Projects Attract Record Investment",
    source: "CryptoSlate",
    url: "https://cryptoslate.com",
  },
];

const HeadlinesContent = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 text-center"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          SolAnarch in the Headlines
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          Curated external coverage about SolAnarch and the wider Solana
          ecosystem.
        </p>
      </motion.div>

      <div className="space-y-3">
        {recentHeadlines.map((headline, index) => (
          <motion.a
            key={headline.title}
            href={headline.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-primary/60 transition-all group"
          >
            <div className="flex-1">
              <p className="text-gray-900 font-medium group-hover:text-primary transition-colors">
                {headline.title}
              </p>
              <p className="text-xs text-gray-500 mt-1">{headline.source}</p>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default HeadlinesContent;


