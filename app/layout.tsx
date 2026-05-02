import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getLocale } from "next-intl/server";
import { getSiteUrl } from "@/lib/site-url";
import { VercelAnalyticsGate } from "@/components/VercelAnalyticsGate";
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
  metadataBase: getSiteUrl(),
  title: {
    default: "Alpha Investor",
    template: "%s - Alpha Investor",
  },
  icons: {
    icon: [{ url: "/brand/favicon-tab.png", sizes: "32x32", type: "image/png" }],
    apple: "/brand/app-icon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        {children}
        <VercelAnalyticsGate />
      </body>
    </html>
  );
}
