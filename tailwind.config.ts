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
      },
      backgroundColor: {
        primary: "var(--background)",
        secondary: "var(--background-secondary)",
      },
    },
  },
  plugins: [],
} satisfies Config;
