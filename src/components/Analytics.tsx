"use client";

import Script from "next/script";

import { isDev } from "@lib/utils";

const searchConsoleID = "G-GKWSZT42C2";

export const GoogleAnalytics = () => {
  if (isDev) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${searchConsoleID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', "${searchConsoleID}");`}
      </Script>
    </>
  );
};
