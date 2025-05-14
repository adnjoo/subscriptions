import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SubsZero",
  description: "Track and manage your recurring subscriptions with ease. Calculate monthly and annual costs, auto-detect popular services, and keep your finances organized.",
  keywords: "subscription tracker, subscription management, recurring payments, financial tracking, expense manager",
  authors: [{ name: "Drew123", url: "https://github.com/adnjoo" }],
  creator: "Drew123",
  icons: {
    icon: [
      {
        url: "/icon.png",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/apple-icon.png",
        type: "image/png",
      },
    ],
  },
  openGraph: {
    title: "SubsZero",
    description: "Track and manage your recurring subscriptions with ease",
    url: "https://subscriptions-alpha.vercel.app",
    siteName: "SubsZero",
    type: "website",
    images: [{ url: "/icon.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SubsZero",
    description: "Track and manage your recurring subscriptions with ease",
    creator: "@adnjoo",
    images: [{ url: "/icon.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
