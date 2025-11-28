"use client";
import React from "react";
import { Send, Github, LineChart } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const menuItems = [
    { title: "Features", href: "#features" },
    { title: "Presale", href: "#presale" },
    { title: "Tokenomics", href: "#tokenomics" },
    { title: "Roadmap", href: "#roadmap" },
    { title: "Security", href: "#security" },
    { title: "FAQ", href: "#faq" },
  ];

  const socialLinks = [
    { icon: <Send className="w-6 h-6" />, href: "#", label: "Telegram" },
    { icon: <Github className="w-6 h-6" />, href: "#", label: "Github" },
    {
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      href: "#",
      label: "Twitter",
    },
  ];

  return (
    <footer className="bg-card">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-4">
              <LineChart className="w-8 h-8 text-primary mr-2" />
              <span className="text-2xl font-bold text-white">SOLANARCH</span>
            </div>
            <p className="text-gray-400 text-sm">
              Solana&apos;s first Layer 2 chain with infinite scalability and multi-chain compatibility.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {menuItems.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  className="text-gray-400 hover:text-primary transition-colors duration-200"
                >
                  {item.title}
                </a>
              ))}
            </div>
          </div>

          {/* Contact & Social */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-white mb-4">
              Connect With Us
            </h3>
            <div className="flex justify-center md:justify-start space-x-4 mb-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-gray-400 hover:text-primary transition-colors duration-200"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
            <p className="text-gray-400 text-sm">
              Contact: support@solanarch.com
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 SolAnarch. All rights reserved.
            </p>
            <div className="flex space-x-4 text-sm text-gray-400">
              <Link href="#" className="hover:text-primary">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-primary">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-primary">
                Whitepaper
              </Link>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="text-center text-xs text-gray-500 mt-8">
          <p>
            Cryptocurrency investments are subject to market risks. Please read
            our whitepaper and conduct your own research before investing.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
