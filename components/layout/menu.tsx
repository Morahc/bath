"use client";

import { ArrowRight, Clock, Mail, Phone } from "lucide-react";
import Link from "next/link";

import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const contactItems = [
  {
    label: "Phone",
    value: "+234 817 4467 822",
    icon: Phone,
  },
  {
    label: "Email",
    value: "contact@aura.com",
    icon: Mail,
  },
  {
    label: "Whatsapp",
    value: "contact@aura.com",
    icon: Clock,
  },
];

export function MobileMenu({ open, setOpen }: Props) {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle className="text-xl font-medium">Classic Luxury Bathrooms</SheetTitle>
        </SheetHeader>
        <ul className="divide-y p-4 overflow-auto text-lg font-semibold">
          <li className="py-4" onClick={() => setOpen(false)}>
            <Link
              className={cn(buttonVariants({ size: "lg" }), "w-full text-base")}
              href="/collections"
            >
              Browse collections
              <ArrowRight className="size-4" />
            </Link>
          </li>
        </ul>

        <SheetFooter>
          <h5 className="font-medium tracking-wider text-lg">Reach us anytime</h5>
          <ul className="flex flex-col gap-4 space-y-4 py-4">
            {contactItems.map(({ label, value, icon: Icon }) => (
              <li key={label}>
                <Link href={"/"} className="flex justify-between items-center gap-4">
                  <div className="flex items-start gap-x-2">
                    <div className="rounded-md p-2 border bg-white inline-flex">
                      <Icon className="size-4" />
                    </div>

                    <div>
                      <h5 className="text-sm font-semibold">{label}</h5>
                      <p className="text-xs text-foreground/60">{value}</p>
                    </div>
                  </div>
                  <ArrowRight className="size-4" />
                </Link>
              </li>
            ))}
          </ul>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
