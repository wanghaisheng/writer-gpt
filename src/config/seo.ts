import { Metadata } from "next";

export const title = "Writer GPT";
export const url = "https://writer-gpt.com/";

export const MetaData: Metadata = {
  title,
  description: "Generated blog posts with AI!",
  keywords: [
    "chatGPT",
    "writer",
    "content writer",
    "ai write blog post",
    "bard",
    "ai"
  ],
  applicationName: title,
  appleWebApp: {
    capable: true,
    title,
    statusBarStyle: "default"
  },
  formatDetection: {
    telephone: false
  },
  themeColor: "#2563eb",
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  manifest: "/manifest.json",
  icons: [
    { rel: "apple-touch-icon", url: "/logo.png" },
    { rel: "shortcut icon", url: "/favicon.ico" }
  ]
};
