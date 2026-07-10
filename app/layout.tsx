import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "./LanguageContext";
import RoutePrefetcher from "./RoutePrefetcher";
import MascotAmbience from "./MascotAmbience";

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
    <html lang="en" suppressHydrationWarning>
      <body>
        <LanguageProvider>
          <RoutePrefetcher />
          <MascotAmbience />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
