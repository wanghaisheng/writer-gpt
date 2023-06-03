import { Metadata } from "next";
import { Inter } from "next/font/google";

import { MetaData } from "@config/seo";

import { HOC } from "@components/HOC";

import "@styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = MetaData;

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="container flex flex-col items-center justify-center gap-y-3 min-h-screen">
          <HOC>{children}</HOC>
        </main>
      </body>
    </html>
  );
}
