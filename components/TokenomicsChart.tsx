"use client";
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
} from "recharts";
import { motion } from "framer-motion";

const TokenomicsChart = () => {

  const data = [
    { name: "Liquidity & Presale", value: 20, color: "#4ADE80" },
    { name: "Marketing & Partnerships", value: 6, color: "#FFB800" },
    { name: "Program Development", value: 34, color: "#60A5FA" },
    { name: "Customer Rewards", value: 8, color: "#F472B6" },
    { name: "Team & Advisors", value: 20, color: "#A78BFA" },
    { name: "Staking", value: 12, color: "#FFFFFF" },
  ];

  // CustomTooltip component with the correct typing for Recharts' TooltipProps
  const CustomTooltip: React.FC<TooltipProps<number, string>> = ({
    active,
    payload,
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg border border-gray-300 shadow-lg">
          <p className="text-gray-900 font-bold">{payload[0].name}</p>
          <p className="text-gray-600">{`${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="w-full mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            SolAnarch Tokenomics
          </h1>
          <p className="text-gray-600 text-xl">
            Total Supply: 250,000,000 $SOLA
          </p>
        </motion.div>

        <div className="h-[24rem]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={160}
                paddingAngle={4}
                dataKey="value"
                animationBegin={0}
                animationDuration={2000}
                startAngle={90}
                endAngle={450}
                isAnimationActive={true}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    strokeWidth={2}
                    stroke="#1a1a1a"
                    className="hover:scale-105 transition-transform duration-300"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-10"
        >
          {data.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.3 }}
              className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-200"
            >
              <div
                className="w-5 h-5 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <div>
                <p className="text-gray-900 font-semibold text-md">
                  {item.name}
                </p>
                <p className="text-gray-600 text-sm">{item.value}%</p>
                <p className="text-gray-500 text-xs">
                  {(250000000 * (item.value / 100)).toLocaleString()} $SOLA
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-10 text-center text-gray-600"
        >
          <p className="mb-2">• 50% of transaction fees are burned</p>
          <p className="mb-2">
            • Team tokens are vested over 3 years (30% annually)
          </p>
          <p>
            • New tokens minted only when staking supply is fully utilized
          </p>
        </motion.div>
      </div>

    </div>
  );
};

export default TokenomicsChart;
