import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/navbar/header";
import ReduxProvider from "@/redux/provider";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Electronics",
  description: "A Superclass Shop for Electronics like Mobile, Labtop, Pc and Headphones",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
        <div className=" bg-gray-50">
        <div>
          <Header />
        </div>
            {children}
        </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
