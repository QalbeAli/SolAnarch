"use client";
import { motion } from "framer-motion";
import { Stars, Sparkles } from "lucide-react";
import QuantPresale from "./QuantPresale";
import { Button } from "./ui/button";

const MotionButton = motion(Button);

const Hero = () => {
  return (
    <div className="relative bg-black overflow-hidden">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      <div className="relative flex flex-col lg:flex-row justify-between mx-auto w-full max-w-7xl items-center py-8 px-4 sm:px-6 md:px-8">
        <motion.div
          className="space-y-6 sm:space-y-8 lg:space-y-10 text-center lg:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Welcome to ZEXXCOIN: <br />
            <motion.span
              className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              AI-Driven Trading Revolution!
            </motion.span>
          </motion.div>

          <motion.div
            className="text-lg sm:text-xl lg:text-2xl text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Experience the future of decentralized finance with{" "}
            <br className="hidden sm:block" />
            quantum-resistant security and AI-powered algorithmic trading.{" "}
            <br className="hidden sm:block" />
            Built on Solana for unmatched speed and efficiency.
          </motion.div>

          <motion.div
            className="space-y-4 sm:space-y-6 lg:space-y-0 lg:space-x-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <MotionButton
              variant="hero"
              size="lg"
              className="group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
              <span className="relative flex items-center gap-2 justify-center">
                <Sparkles className="w-5 h-5" />
                Join Presale
              </span>
            </MotionButton>

            <MotionButton
              variant="hero"
              size="lg"
              className="group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
              <span className="relative flex items-center gap-2 justify-center">
                <Stars className="w-5 h-5" />
                View Whitepaper
              </span>
            </MotionButton>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-8 lg:mt-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <QuantPresale />
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
