
"use client"
import localFont from "next/font/local";
import "./globals.css";
import ConvexClientProvider from "../../providers/ConvexClientProvider";
import { Authenticated, AuthLoading } from "convex/react";
import LoadingLogo from "@/components/shared/LoadingLogo";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        <ConvexClientProvider>
          <AuthLoading><LoadingLogo/></AuthLoading>
          <Authenticated>{children}</Authenticated>
          </ConvexClientProvider>
      </body>
    </html>
  );
}
