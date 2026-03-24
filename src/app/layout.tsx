import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppThemeProvider from "../theme/AppThemeProvider";
import MainLayout from "../components/layout/MainLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ScholarFlow | School Management System",
  description: "Enterprise-grade school management software",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body style={{ margin: 0, padding: 0 }}>
        <AppThemeProvider>
          <MainLayout>
            {children}
          </MainLayout>
        </AppThemeProvider>
      </body>
    </html>
  );
}
