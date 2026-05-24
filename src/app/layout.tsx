import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "next-themes";
import SessionProvider from "../components/utils/SessionProvider";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const nbFont = localFont({
  src: "./font/NB International Regular/NB International Regular.otf",
  variable: "--font-nb",
});

const plentyFont = localFont({
  src: "./font/plenty-font/Plenty Custom.otf",
  variable: "--font-plenty",
});

export const metadata: Metadata = {
  title: "IoTernak",
  description: "Platform Manajemen Kambing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${nbFont.variable} ${plentyFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-nb">
        <SessionProvider>
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <main className="grow">
              <Toaster position="top-center" reverseOrder={false} />
              {children}
            </main>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
