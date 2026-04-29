import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MainSidebar from "./ui/sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LinkSnap Dashboard",
  description: "URL Shortener Analytics Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-screen antialiased bg-white`}
    >
      <body
        className="min-h-screen flex  bg-gray-50 mx-auto
      "
      >
        {/* Sidebar */}
        <MainSidebar />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-100">{children}</main>
      </body>
    </html>
  );
}
