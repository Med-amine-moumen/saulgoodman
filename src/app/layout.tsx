import type { Metadata, Viewport } from "next";
import { Anton, Bebas_Neue, Oswald, Special_Elite } from "next/font/google";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

const specialElite = Special_Elite({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-special-elite",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Saul Goodman, Attorney at Law — Better Call Saul!",
  description:
    "Need a lawyer? You don't want a criminal lawyer. You want a CRIMINAL lawyer. (505) 503-4455 — Better Call Saul!",
};

export const viewport: Viewport = {
  themeColor: "#FFD700",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${bebas.variable} ${oswald.variable} ${specialElite.variable}`}
    >
      <body className="bg-saul-cream text-saul-ink min-h-screen">
        {children}
      </body>
    </html>
  );
}
