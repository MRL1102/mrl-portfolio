import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "马瑞良 | Portfolio",
  description: "马瑞良 - 环境工程、AI 与产品实践作品集。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
