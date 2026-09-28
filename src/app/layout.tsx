import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const satoshi = localFont({
  variable: "--font-heading",
  src: "../fonts/Satoshi-Black.woff2",
  weight: "900",
  style: "normal",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
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
      className={`${satoshi.variable} ${inter.variable} ${plexMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
