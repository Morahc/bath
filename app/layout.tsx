import type { Metadata } from "next";
import { Lato } from "next/font/google";

import { QueryProvider } from "@/integrations/query-provider";
import "./globals.css";

const lato = Lato({
  variable: "--font-lato",
  weight: ["100", "300", "400", "700", "900"],
  fallback: ["san-serif"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Classic Luxury Bathrooms",
  description: "High Quality Luxury Bathrooms and Sanitary Wares",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${lato.variable} relative antialiased`}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
