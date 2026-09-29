import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const satoshi = localFont({
  variable: "--font-heading",
  src: "../fonts/Satoshi Medium/Satoshi Medium.woff2",
  weight: "500",
  style: "normal",
});

const workSans = localFont({
  variable: "--font-body",
  src: "../fonts/WorkSans-Variable.woff2",
  weight: "100 900",
  style: "normal",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Latitude Zimbabwe Financial Advisory",
  description:
    "Finance, IT Solutions and Actuarial Services — insights that drive smarter decisions and sustainable growth.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${satoshi.variable} ${workSans.variable} ${plexMono.variable}`}
    >
      <head>
        {/* Without JavaScript the line reveal never runs, so show the text */}
        <noscript>
          <style>{`[data-reveal] { visibility: visible; }`}</style>
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
