"use client";

import Link from "next/link";
import { ArrowRight, Menu } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./menu";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md shadow-xs w-full">
      <nav className="flex justify-between items-center w-full max-w-7xl mx-auto h-16 md:h-18 px-4 py-2">
        <Link href="/" className="relative">
          <Image
            preload
            src={"/images/logo.png"}
            alt="Classic Luxury Bathrooms"
            sizes="(max-width: 110px) 100vw, (max-width: 150px) 50vw, 33vw"
            fetchPriority="high"
            width={110}
            height={61}
          />
        </Link>
        <div className="hidden md:flex items-center gap-4">
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link
              href="/collections"
              prefetch
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              Collections
            </Link>
          </div>

          <Link href="/#contact" className={cn(buttonVariants())}>
            Inquire Now
            <ArrowRight />
          </Link>
        </div>
        <Button
          aria-label="Hamburger menu button"
          variant={"link"}
          className="md:hidden"
          onClick={() => setOpen(true)}
        >
          <Menu className="size-6" />
        </Button>
      </nav>
      <MobileMenu open={open} setOpen={setOpen} />
    </header>
  );
}
