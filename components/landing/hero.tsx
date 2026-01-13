import Link from "next/link";
import Image from "next/image";
import { Award, PenTool, ShieldCheck, Truck } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";

const data = [
  {
    title: "Premium Quality",
    description: "Sourced from the finest stone and ceramics.",
    icon: Award,
  },
  {
    title: "Modern Designs",
    description: "Sleek and contemporary styles to elevate any space.",
    icon: PenTool,
  },
  {
    title: "Warranty Assured",
    description: "Comprehensive coverage for peace of mind.",
    icon: ShieldCheck,
  },
  {
    title: "White Glove Delivery",
    description: "Careful handling and setup at your location.",
    icon: Truck,
  },
];

export default function Hero() {
  return (
    <section>
      <div className="max-w-7xl mx-auto grid items-center gap-8 md:grid-cols-2 py-8 px-4 h-auto md:h-svh">
        <div className="flex flex-col gap-4 md:gap-8">
          <h1 className="text-5xl md:text-4xl font-bold">Elevate Your Sanctuary</h1>
          <p className="text-2xl tracking-wide">
            Discover a curated selection of premium bathroom fixtures designed for serenity,
            functionality, and timeless elegance.
          </p>
          <div className="flex items-center gap-4">
            <Link className={cn(buttonVariants({ size: "lg" }))} href="/collections">
              View Collections
            </Link>
            <Link className={cn(buttonVariants({ size: "lg", variant: "outline" }))} href="/#contact">
              Visit Showroom
            </Link>
          </div>
        </div>
        <div className="relative aspect-4/3 md:aspect-square rounded-2xl overflow-hidden shadow-2xl">
          <Image
            fill
            src="/images/hero-image.jpg"
            alt="Hero Image"
            className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
          />
        </div>
      </div>
      <div className="bg-white py-8 md:px-4 h-auto">
        <div className="max-w-7xl w-full mx-auto grid gap-4 sm:grid-cols-2 md:grid-cols-4 divide-y md:divide-none">
          {data.map(({ title, description, icon: Icon }) => (
            <div key={title} className="p-4 space-y-2">
              <Icon className="size-5 text-foreground/60 stroke-1" />
              <h3 className="font-semibold">{title}</h3>
              <p className="text-sm">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
