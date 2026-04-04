import type { Metadata } from "next";
import "./globals.css";
import RoutePrefetcher from "./RoutePrefetcher";

export const metadata: Metadata = {
  title: "Pianify",
  description: "Ứng dụng học Piano hiệu quả dành cho mọi người.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>
        <RoutePrefetcher />
        {children}
      </body>
    </html>
  );
}
