"use client";

import React from "react";
import { motion } from "framer-motion";

const blogUpdates = [
  {
    id: 1,
    title: "SolAnarch Presale Phase 1 Launches Successfully",
    date: "January 15, 2025",
    excerpt:
      "The first phase of our presale has exceeded expectations with overwhelming community support.",
  },
  {
    id: 2,
    title: "Partnership Announcement: Major Exchange Listing",
    date: "January 10, 2025",
    excerpt:
      "We're excited to announce our upcoming listing on major exchanges in Q2 2025.",
  },
  {
    id: 3,
    title: "Staking Rewards Program Now Live",
    date: "January 5, 2025",
    excerpt:
      "Earn up to 56% APY by staking your $SOLA tokens. Start earning rewards today!",
  },
];

const BlogContent = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 text-center"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          SolAnarch Blog
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          Updates, insights, and stories from the SolAnarch team and community.
        </p>
      </motion.div>

      <div className="space-y-4">
        {blogUpdates.map((post, index) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 md:p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                {post.title}
              </h2>
              <span className="text-xs text-gray-500 whitespace-nowrap">
                {post.date}
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-3">{post.excerpt}</p>
            <p className="text-gray-500 text-xs">
              *Placeholder content. Replace with real articles, AMA recaps, or
              announcements as your project evolves.
            </p>
          </motion.article>
        ))}
      </div>
    </div>
  );
};

export default BlogContent;


