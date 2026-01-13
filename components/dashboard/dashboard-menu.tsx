"use client";

import Link from "next/link";
import { LogOut } from "lucide-react";

import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { logout } from "@/actions/auth";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const navData = [
  {
    label: "Collections",
    href: "/dashboard/collections",
  },
  {
    label: "Categories",
    href: "/dashboard/categories",
  },
];

export function DashbaordMenu({ open, setOpen }: Props) {
  function handleLogout() {
    logout();
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-2xl font-medium">Menu</SheetTitle>
        </SheetHeader>
        <ul className="divide-y p-4 overflow-auto text-lg font-semibold">
          {navData.map((item) => (
            <li key={item.label} className="py-4" onClick={() => setOpen(false)}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
        <SheetFooter>
          <Button onClick={handleLogout}>
            Logout <LogOut />
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
