import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pianify – Quên mật khẩu",
  description: "Đặt lại mật khẩu tài khoản Pianify của bạn.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
