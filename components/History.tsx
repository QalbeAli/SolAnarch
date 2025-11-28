"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Calendar, TrendingUp, Users, Rocket } from "lucide-react";

const History = () => {
  const milestones = [
    {
      date: "Q4 2024",
      title: "Project Inception",
      description: "SolAnarch was conceptualized as a revolutionary Layer 2 solution for Solana, combining meme culture with serious blockchain technology.",
      icon: <Rocket className="w-6 h-6" />,
    },
    {
      date: "January 2025",
      title: "Presale Launch",
      description: "Successfully launched Phase 1 of the presale, attracting thousands of early supporters and raising significant community interest.",
      icon: <TrendingUp className="w-6 h-6" />,
    },
    {
      date: "January 2025",
      title: "Community Growth",
      description: "Reached 10,000+ community members across all platforms, establishing a strong foundation for future growth.",
      icon: <Users className="w-6 h-6" />,
    },
    {
      date: "Q2 2025",
      title: "Exchange Listings (Upcoming)",
      description: "Planned listings on major DEX and CEX platforms, making $SOLA accessible to a global audience.",
      icon: <Calendar className="w-6 h-6" />,
    },
  ];

  return (
    <div className="relative overflow-hidden">
      <Image
        src="/images/moon.png"
        alt="SolAnarch history background"
        fill
        className="object-cover opacity-20 md:opacity-25 pointer-events-none select-none"
      />
      <div className="relative space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">SolAnarch History</h1>
        <p className="text-gray-600 text-lg">
          A journey of innovation, community building, and blockchain revolution
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto space-y-8">
        {milestones.map((milestone, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            className="relative"
          >
            <div className="flex items-start gap-6">
              {/* Timeline Icon */}
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center text-primary">
                {milestone.icon}
              </div>

              {/* Content */}
              <div className="flex-1 bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-primary/10 text-primary border border-primary/30 rounded-full text-sm font-semibold">
                    {milestone.date}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900">{milestone.title}</h3>
                </div>
                <p className="text-gray-600">{milestone.description}</p>
              </div>
            </div>

            {/* Timeline Line */}
            {index < milestones.length - 1 && (
              <div className="absolute left-6 top-12 w-0.5 h-full bg-gray-300 -z-10" />
            )}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-12 bg-white rounded-xl p-6 border border-gray-200 shadow-sm text-center"
      >
        <h3 className="text-2xl font-bold text-gray-900 mb-4">The Future is Bright</h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          SolAnarch continues to evolve, with exciting developments on the horizon. 
          Join us as we build the future of Solana Layer 2 technology and meme coin innovation.
        </p>
      </motion.div>
      </div>
    </div>
  );
};

export default History;

