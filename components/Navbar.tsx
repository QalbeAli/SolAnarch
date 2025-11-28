"use client";
import React from "react";
import Link from "next/link";
import SolanaWallet from "./Wallet";

type NavbarProps = {
  activeTab: string;
  onTabChange: (tab: string) => void;
};

const Navbar = ({ activeTab, onTabChange }: NavbarProps) => {
  const tabs = [
    { id: "home", label: "HOME" },
    { id: "howtobuy", label: "HOW TO BUY" },
    { id: "tokenomics", label: "TOKENOMICS" },
    { id: "history", label: "HISTORY" },
    { id: "faq", label: "FAQS" },
    { id: "roadmap", label: "ROADMAP" },
    { id: "blog", label: "BLOG" },
    { id: "headlines", label: "HEADLINES" },
  ];

  return (
    <nav className="w-full border-b border-gray-300 bg-white shadow-sm z-50">
      <div className="flex items-center justify-between px-6 h-16">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="text-gray-900 font-bold text-xl">
            SOLANARCH
          </div>
          <div className="text-gray-600 text-sm">
            $SOLA
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center space-x-1 flex-1 justify-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-4 py-2 text-sm font-semibold transition-colors duration-200 ${activeTab === tab.id
                ? "text-primary border-b-2 border-primary"
                : "text-gray-600 hover:text-gray-900"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Wallet */}
        <div className="flex items-center space-x-4">
          <SolanaWallet />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
