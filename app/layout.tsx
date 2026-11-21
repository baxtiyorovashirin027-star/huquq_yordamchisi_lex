import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const font = Manrope({ subsets: ["latin", "latin-ext"], weight: ["400", "500", "600", "700", "800"] });

export const metadata: Metadata = {
  title: "HuquqYordam — huquqiy yordam doimo yoningizda",
  description: "Davlat va huquqiy xizmatlarni topish, hujjatlarni aniqlash va ariza tayyorlash.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz">
      <body className={font.className}>{children}</body>
    </html>
  );
}
