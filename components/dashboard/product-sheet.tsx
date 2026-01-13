"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import ProductForm from "./product-form";
import { Product } from "@/types";

interface Props {
  currentRow?: Product;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function ProductSheet({ open, setOpen, currentRow }: Props) {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{!currentRow ? "Create product" : "Update product"}</SheetTitle>
        </SheetHeader>
        <div className="p-4 overflow-auto">
          <ProductForm />
        </div>
      </SheetContent>
    </Sheet>
  );
}
