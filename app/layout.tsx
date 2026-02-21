import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";

const lato = localFont({
  variable: "--font-lato",
  display: "swap",
  preload: true,
  fallback: ["sans-serif"],
  src: [
    {
      path: "../public/fonts/Lato/Lato-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/Lato/Lato-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Lato/Lato-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Lato/Lato-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Lato/Lato-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
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
      <body className={`${lato.variable} relative antialiased`}>{children}</body>
    </html>
  );
}
