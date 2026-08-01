import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "马瑞良 | Portfolio",
  description: "马瑞良 - 环境工程、AI 与产品实践作品集。",
  metadataBase: new URL("https://mrl-portfolio-2026.maruiliang1102.chatgpt.site"),
  openGraph: {
    title: "马瑞良 | Portfolio",
    description: "环境工程、AI 与产品实践作品集。",
    images: ["/og.png"],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
