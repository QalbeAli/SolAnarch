import React from "react";
import HeadlinesContent from "@/components/HeadlinesContent";

const HeadlinesPage = () => {
  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <div className="flex-1 overflow-y-auto px-6 py-6 max-w-5xl mx-auto">
        <HeadlinesContent />
      </div>
    </div>
  );
};

export default HeadlinesPage;



