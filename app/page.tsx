"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import QuantPresale from "@/components/QuantPresale";
import HomeContent from "@/components/HomeContent";
import HowToBuy from "@/components/HowToBuy";
import TokenomicsChart from "@/components/TokenomicsChart";
import History from "@/components/History";
import FAQ from "@/components/FAQ";
import Roadmap from "@/components/Roadmap";
import BlogContent from "@/components/BlogContent";
import HeadlinesContent from "@/components/HeadlinesContent";

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <HomeContent />;
      case "howtobuy":
        return <HowToBuy />;
      case "tokenomics":
        return <TokenomicsChart />;
      case "history":
        return <History />;
      case "faq":
        return <FAQ />;
      case "roadmap":
        return <Roadmap />;
      case "blog":
        return <BlogContent />;
      case "headlines":
        return <HeadlinesContent />;
      default:
        return <HomeContent />;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* Left Panel - Dynamic Content */}
        <div 
          className="flex-1 overflow-y-auto px-6 py-4 scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-gray-200 min-h-0"
          style={{ 
            overscrollBehavior: 'contain',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {renderContent()}
        </div>
        {/* Right Panel - Fixed Presale Card */}
        <div className="w-[400px] border-l border-gray-300 bg-white flex flex-col h-full min-h-0">
          <div 
            className="p-4 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-gray-200"
            style={{ 
              overscrollBehavior: 'contain',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            <QuantPresale />
          </div>
        </div>
      </div>
    </div>
  );
}
