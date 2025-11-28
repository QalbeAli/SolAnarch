"use client"
import React from "react";
import BlogContent from "@/components/BlogContent";

const BlogPage = () => {
  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <div className="flex-1 overflow-y-auto px-6 py-6 max-w-5xl mx-auto">
        <BlogContent />
      </div>
    </div>
  );
};

export default BlogPage;



