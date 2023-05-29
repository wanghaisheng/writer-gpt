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
        <HOC>{children}</HOC>
      </body>
    </html>
  );
}
