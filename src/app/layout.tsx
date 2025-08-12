import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Playfair_Display, Open_Sans } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SessionProvider } from "@/components/SessionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const openSans = Open_Sans({
  variable: "--font-opensans",
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Handcrafted Haven - Unique Handmade Treasures from Talented Artisans",
    template: "%s | Handcrafted Haven"
  },
  description: "Discover unique handcrafted items from passionate creators. Support sustainable craftsmanship and bring home one-of-a-kind treasures. Browse handmade jewelry, textiles, art, and home decor from talented artisans.",
  keywords: [
    "handmade",
    "handcrafted",
    "artisan",
    "crafts",
    "handmade jewelry",
    "handmade textiles",
    "handmade art",
    "handmade home decor",
    "sustainable shopping",
    "unique gifts",
    "artisan marketplace",
    "handcrafted treasures"
  ],
  authors: [{ name: "Handcrafted Haven Team" }],
  creator: "Handcrafted Haven",
  publisher: "Handcrafted Haven",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://handcrafted-haven.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://handcrafted-haven.vercel.app',
    title: 'Handcrafted Haven - Unique Handmade Treasures',
    description: 'Discover unique handcrafted items from passionate creators. Support sustainable craftsmanship and bring home one-of-a-kind treasures.',
    siteName: 'Handcrafted Haven',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Handcrafted Haven - Unique Handmade Treasures',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Handcrafted Haven - Unique Handmade Treasures',
    description: 'Discover unique handcrafted items from passionate creators. Support sustainable craftsmanship and bring home one-of-a-kind treasures.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} ${openSans.variable} antialiased`}
      >
        <SessionProvider>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            minHeight: '100vh' 
          }}>
            <Navigation />
            <main style={{ flex: '1' }}>
              {children}
            </main>
            <Footer />
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
