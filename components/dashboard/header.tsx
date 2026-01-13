"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

import { Button } from "../ui/button";
import { DashbaordMenu } from "./dashboard-menu";
import Image from "next/image";

export default function DashboardHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md shadow-xs w-full">
      <nav className="flex justify-between items-center w-full max-w-7xl mx-auto h-16 md:h-18 px-4">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tighter uppercase flex items-center gap-2"
        >
          <Image src={"/images/logo.png"} alt="Classic Luxury Bathrooms" width={140} height={60} />
        </Link>
        <Button variant={"ghost"} onClick={() => setOpen((prev) => !prev)}>
          <Menu className="size-6" />
        </Button>
      </nav>
      <DashbaordMenu open={open} setOpen={setOpen} />
    </header>
  );
}
