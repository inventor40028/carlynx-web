import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import RippleEffect from "@/components/ui/RippleEffect";
import ScrollAnimations from "@/components/ui/ScrollAnimations";
import MetaMaskSuppressor from "@/components/ui/MetaMaskSuppressor";
import GlobalLoader from "@/components/ui/GlobalLoader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CarLynk - Linking Car Owners with Trusted Drivers",
  description: "Professional driver-owner partnership platform in Ghana",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0d1b2e",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <MetaMaskSuppressor />
        <GlobalLoader />
        <RippleEffect />
        <ScrollAnimations />
        {children}
      </body>
    </html>
  );
}
