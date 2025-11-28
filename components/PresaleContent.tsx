"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { DollarSign, Target, PieChart as PieChartIcon } from "lucide-react";

const PresaleContent = () => {
  const stats = [
    {
      label: "Total to Raise",
      value: "$11,000,000,000",
      icon: <DollarSign className="w-5 h-5 text-primary" />,
    },
    {
      label: "Total Token Supply",
      value: "111,111,111,111 $SOLA",
      icon: <PieChartIcon className="w-5 h-5 text-secondary" />,
    },
    {
      label: "Base Cost per Token",
      value: "$0.000099",
      icon: <Target className="w-5 h-5 text-primary" />,
    },
  ];

  const rounds = [
    {
      name: "Round 1",
      price: "$0.000039",
      tokens: "4,444,444,444",
      raise: "$173,333.33",
    },
    {
      name: "Round 2",
      price: "$0.000059",
      tokens: "11,111,111,111",
      raise: "$1,966,666.67",
    },
    {
      name: "Round 3",
      price: "$0.000079",
      tokens: "22,222,222,222",
      raise: "$1,755,555.55",
    },
    {
      name: "Round 4",
      price: "$0.000199",
      tokens: "55,256,806,253,501",
      raise: "$3,895,555.55",
    },
  ];

  return (
    <div className="relative overflow-hidden">
      <Image
        src="/images/rich.png"
        alt="SolAnarch presale background"
        fill
        className="object-cover opacity-20 md:opacity-25 pointer-events-none select-none"
      />
      <div className="relative space-y-6">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
          SOLANARCH PRESALE OVERVIEW
        </h1>
        <p className="text-lg md:text-xl text-gray-600">
          Transparent presale structure designed for fair access, clear pricing,
          and long-term sustainability.
        </p>
      </motion.div>

      {/* Key Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {stats.map((item) => (
          <div
            key={item.label}
            className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex items-center gap-3"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
              {item.icon}
            </div>
            <div className="text-left">
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                {item.label}
              </p>
              <p className="text-lg font-semibold text-gray-900">
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Rounds Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl border border-gray-200 shadow-sm p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Presale Rounds</h2>
          <p className="text-xs text-gray-500 max-w-sm text-right">
            Values shown are indicative targets. Final allocations and raise
            amounts may vary slightly based on on-chain execution and market
            conditions.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 uppercase text-xs">
                <th className="py-2 pr-4">Round</th>
                <th className="py-2 pr-4">Price / $SOLA</th>
                <th className="py-2 pr-4">Tokens</th>
                <th className="py-2 pr-4">Target Raise (USD)</th>
              </tr>
            </thead>
            <tbody>
              {rounds.map((round, idx) => (
                <tr
                  key={round.name}
                  className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="py-2 pr-4 font-semibold text-gray-900">
                    {round.name}
                  </td>
                  <td className="py-2 pr-4 text-gray-700">{round.price}</td>
                  <td className="py-2 pr-4 text-gray-700">{round.tokens}</td>
                  <td className="py-2 pr-4 text-gray-900 font-semibold">
                    {round.raise}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="bg-white rounded-xl border border-gray-200 shadow-sm p-6"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          Why this structure?
        </h3>
        <p className="text-gray-600 text-sm mb-2">
          Early rounds reward believers with the lowest entry price, while later
          rounds help establish a strong liquidity foundation and marketing
          budget. The goal is to balance opportunity for early adopters with
          long-term project sustainability.
        </p>
        <p className="text-gray-600 text-sm">
          Combined with Solana Layer 2 scalability and meme-driven community
          energy, SolAnarch aims to create a token that is fun, fast, and built
          for the long haul.
        </p>
      </motion.div>
      </div>
    </div>
  );
};

export default PresaleContent;


