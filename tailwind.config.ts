import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Main brand colors - light brown / sand palette
        primary: {
          DEFAULT: "#B45309", // warm amber-brown
          light: "#FBBF24",
          dark: "#92400E",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#78350F", // deeper brown
          light: "#D97706",
          dark: "#451A03",
          foreground: "#FFFFFF",
        },
        // UI Elements
        button: {
          DEFAULT: "#F8FAFC", // Soft white
          hover: "#F1F5F9",
          active: "#E2E8F0",
        },
        background: {
          DEFAULT: "#F0F9FF", // Very light blue
          dark: "#0F172A",
          card: "#F0FDFA", // Very light green
          footer: "#0F172A",
        },
        // Text colors
        text: {
          primary: "#0F172A", // Dark blue-gray
          secondary: "#334155", // Medium blue-gray
          muted: "#64748B", // Light blue-gray
          inverse: "#FFFFFF",
        },
        // Accent colors
        accent: {
          blue: "#2563EB",
          green: "#22C55E",
          teal: "#0D9488",
          sky: "#0EA5E9",
          mint: "#A7F3D0",
        },
        // Chart colors
        chart: {
          1: "#0EA5E9",
          2: "#10B981",
          3: "#0D9488",
          4: "#2563EB",
          5: "#34D399",
        },
        // Border colors
        border: {
          DEFAULT: "#E2E8F0",
          dark: "#1E293B",
        },
        // Status colors
        status: {
          success: "#10B981",
          warning: "#F59E0B",
          error: "#EF4444",
          info: "#0EA5E9",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [animate],
} satisfies Config;
