import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      textColor: {
        primary: "var(--foreground)",
        secondary: "var(--foreground-secondary)",
        muted: "var(--foreground-muted)",
        highlight: "var(--foreground-highlight)",
        business: "var(--foreground-business)",
      },
      backgroundColor: {
        primary: "var(--background)",
        secondary: "var(--background-secondary)",
        footer: "var(--background-footer)",
        highlight: "var(--background-highlight)",
        business: "var(--background-business)",
      },
    },
  },
  plugins: [],
} satisfies Config;
