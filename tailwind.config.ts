import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: "#1577b8", dark: "#0f5e94", light: "#e6f3fb", soft: "#f4f9fd" },
        ink: "#10243a",
      },
    },
  },
  plugins: [],
};
export default config;
