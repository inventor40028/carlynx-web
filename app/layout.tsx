import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./themes.css";
import RippleEffect from "@/components/ui/RippleEffect";
import ScrollAnimations from "@/components/ui/ScrollAnimations";
import MetaMaskSuppressor from "@/components/ui/MetaMaskSuppressor";
import GlobalLoader from "@/components/ui/GlobalLoader";
import ThemeProvider from "@/components/ui/ThemeProvider";
import ThemeToast from "@/components/ui/ThemeToast";

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
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Apply the saved theme before first paint to avoid a flash of the default. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('carlynk_theme');if(t)document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <MetaMaskSuppressor />
        <ThemeProvider />
        <GlobalLoader />
        <RippleEffect />
        <ScrollAnimations />
        {children}
        <ThemeToast />
      </body>
    </html>
  );
}
