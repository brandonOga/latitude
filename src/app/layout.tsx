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
      // is-loading locks scrolling until the Preloader finishes and removes it
      className={`${satoshi.variable} ${workSans.variable} ${plexMono.variable} is-loading`}
    >
      <head>
        {/* Without JavaScript the preloader and reveals never run, so skip
            the loading screen and show everything */}
        <noscript>
          <style>{`
            [data-reveal] { visibility: visible; }
            .preloader { display: none; }
            html.is-loading { overflow: auto; }
          `}</style>
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
