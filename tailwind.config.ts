import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        base: "#070A0F",
        panel: "#0C1018",
        "panel-2": "#101520",
        edge: "#192030",
        "edge-bright": "#253045",
        accent: "#A97BFF",
        "accent-dim": "#1E0A3C",
        danger: "#FF3366",
        "danger-dim": "#3D0018",
        safe: "#00CC6A",
        "safe-dim": "#003320",
        warn: "#FFAD00",
        "warn-dim": "#3D2900",
        ink: "#C8D4E8",
        "ink-muted": "#546280",
        "ink-dim": "#2D3850",
      },
    },
  },
  plugins: [],
};

export default config;
