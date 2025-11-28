"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const HomeContent = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="flex flex-col lg:flex-row items-stretch gap-6">
        {/* Left: full-height character image */}
        <motion.div
          initial={{ opacity: 0, x: -80, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative w-full lg:w-1/2 min-h-[420px] lg:min-h-[580px]"
        >
          <motion.div
            className="absolute inset-0"
            animate={{ y: [0, -12, 0] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          >
            <Image
              src="/images/hand.png"
              alt="SolAnarch mascot"
              fill
              priority
              className="object-contain object-left-bottom pointer-events-none select-none"
            />
          </motion.div>
        </motion.div>

        {/* Right: logo + minimal token info */}
        <motion.div
          initial={{ opacity: 0, x: 60, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
          className="flex-1 flex flex-col justify-center space-y-6"
        >
          {/* Logo and title */}
          <div className="flex flex-col items-center lg:items-start gap-4">
            <motion.div
              className="relative w-44 h-44 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-amber-300 shadow-lg bg-white"
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
            >
              <Image
                src="/images/main.png"
                alt="SolAnarch token logo"
                fill
                priority
                className="object-cover"
              />
            </motion.div>
            <div className="text-center lg:text-left space-y-1">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
                SOLANARCH
              </h1>
              <p className="text-base md:text-lg text-gray-600 max-w-xl">
                The Solana L2 meme token aiming straight for the moon, built for
                speed, low fees, and a community that never sleeps.
              </p>
            </div>
          </div>

          {/* Token info row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                Token Name
              </p>
              <p className="text-xl font-semibold text-gray-900">
                SolAnarch
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                Symbol
              </p>
              <p className="text-xl font-semibold text-gray-900">$SOLA</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                Network
              </p>
              <p className="text-xl font-semibold text-gray-900">
                Solana Layer 2
              </p>
            </div>
          </div>

          {/* Small tagline strip */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-2">
            <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-[11px] font-semibold text-primary">
              BUILT ON SOLANA
            </span>
            <span className="px-3 py-1 rounded-full bg-secondary/10 border border-secondary/30 text-[11px] font-semibold text-secondary">
              LAYER 2 SPEED
            </span>
            <span className="px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-[11px] font-semibold text-amber-700">
              COMMUNITY POWERED
            </span>
          </div>
        </motion.div>
      </div>


    </div>
  );
};

export default HomeContent;


