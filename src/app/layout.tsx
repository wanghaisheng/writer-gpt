import { Metadata } from "next";
import { Inter } from "next/font/google";

import { MetaData } from "@config/seo";

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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
