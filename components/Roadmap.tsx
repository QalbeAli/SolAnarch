"use client";
import React from "react";
import { motion } from "framer-motion";
import { Rocket, Code, LineChart, Shield, Globe } from "lucide-react";

const Roadmap = () => {
  const phases = [
    {
      phase: "1",
      title: "Development & Launch",
      description: "Initial development and smart contract deployment",
      icon: <Code className="w-8 h-8 text-primary" />,
      items: [
        "Release of White Paper",
        "Smart Contract Development",
        "Security Audit",
        "Contract Deployment",
      ],
    },
    {
      phase: "2",
      title: "Presale Launch",
      description: "Token presale and marketing campaign",
      icon: <Rocket className="w-8 h-8 text-primary" />,
      items: [
        "60-Day Token Presale",
        "Marketing Campaign Launch",
        "Community Building",
        "Paid Advertising",
      ],
    },
    {
      phase: "3",
      title: "Exchange Listings",
      description: "DEX and CEX listings with platform development",
      icon: <Globe className="w-8 h-8 text-primary" />,
      items: [
        "Initial DEX & CEX Listings",
        "Strategic Partnerships",
        "Enterprise Adoption",
        "Quantumence Wallet Launch",
        "Staking Platform Release",
      ],
    },
    {
      phase: "4",
      title: "Mass Adoption & Scaling",
      description: "Platform expansion and security upgrades",
      icon: <Shield className="w-8 h-8 text-primary" />,
      items: [
        "Quantum-Resistant Upgrades",
        "Merchant Integrations",
        "Governance Implementation",
        "AI Trading Optimization",
      ],
    },
  ];

  return (
    <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            SolAnarch Development Roadmap
          </h1>
          <div className="flex justify-center">
            <LineChart className="w-6 h-6 text-primary animate-pulse" />
          </div>
        </motion.div>
        <div className="max-w-4xl mx-auto">
          {phases.map((phase, index) => (
            <motion.div
              key={phase.phase}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="mb-12"
            >
              <div
                className={`flex items-start gap-6 flex-col sm:flex-row ${
                  index % 2 === 0 ? "" : "sm:flex-row-reverse"
                }`}
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/10 border-2 border-primary shadow-md flex items-center justify-center flex-shrink-0">
                  {phase.icon}
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200 flex-grow"
                >
                  <div className="flex items-center mb-4">
                    <span className="text-xl sm:text-2xl font-bold text-primary">
                      Phase {phase.phase}
                    </span>
                    <div className="h-px bg-gradient-to-r from-primary to-transparent flex-grow ml-4" />
                  </div>

                  <h3 className="text-lg sm:text-xl font-semibold text-secondary mb-2">
                    {phase.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm sm:text-base">
                    {phase.description}
                  </p>

                  <div className="space-y-2">
                    {phase.items.map((item, i) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 + i * 0.1 }}
                        className="flex items-center gap-2"
                      >
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span className="text-gray-700 text-sm sm:text-base">
                          {item}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
    </div>
  );
};

export default Roadmap;
