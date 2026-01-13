import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Classic Luxury Bathrooms",
    template: "%s | Classic Luxury Bathrooms",
  },
  description:
    "Classic Luxury Bathrooms offers premium bathroom fixtures and sanitary wares including toilets, sinks, jacuzzis, taps, mirrors, and accessories crafted for elegance and durability.",

  keywords: [
    "luxury bathrooms",
    "bathroom fixtures",
    "sanitary wares",
    "toilets",
    "sinks",
    "jacuzzi",
    "bathroom accessories",
  ],

  authors: [{ name: "Classic Luxury Bathrooms Ltd." }],
  creator: "Classic Luxury Bathrooms Ltd.",
  publisher: "Classic Luxury Bathrooms Ltd.",

  metadataBase: new URL("https://classicluxurybathrooms.com"),

  openGraph: {
    title: "Classic Luxury Bathrooms",
    description:
      "Premium luxury bathroom fixtures and sanitary wares designed for modern homes and commercial spaces.",
    url: "https://classicluxurybathrooms.com",
    siteName: "Classic Luxury Bathrooms",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Classic Luxury Bathrooms - Premium Sanitary Wares",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Classic Luxury Bathrooms",
    description: "Discover high quality luxury bathroom fixtures and sanitary wares.",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "https://classicluxurybathrooms.com",
  },
};

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
