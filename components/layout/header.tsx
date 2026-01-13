"use client";

import Link from "next/link";
import { ArrowRight, Menu } from "lucide-react";
import { useState } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { MobileMenu } from "./menu";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md shadow-xs w-full">
      <nav className="flex justify-between items-center w-full max-w-7xl mx-auto h-16 md:h-18 px-4">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tighter uppercase flex items-center gap-2 relative aspect-4/3"
        >
          <Image src={"/images/logo.png"} alt="Classic Luxury Bathrooms" width={120} height={60} />
        </Link>
        <div className="hidden md:flex items-center gap-4">
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link
              href="/collections"
              className={cn(buttonVariants({ variant: "secondary" }), "bg-white")}
            >
              Collections
            </Link>
          </div>

          <Link href="/#contact" className={cn(buttonVariants())}>
            Inquire Now
            <ArrowRight />
          </Link>
        </div>
        <Button variant={"link"} className="md:hidden" onClick={() => setOpen(true)}>
          <Menu className="size-6" />
        </Button>
      </nav>
      <MobileMenu open={open} setOpen={setOpen} />
    </header>
  );
}
