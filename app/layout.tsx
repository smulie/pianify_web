import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "./LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";
import RoutePrefetcher from "./RoutePrefetcher";

export const metadata: Metadata = {
  title: "Pianify",
  description: "Effective Piano learning app for everyone.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <LanguageSwitcher />
          <RoutePrefetcher />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
