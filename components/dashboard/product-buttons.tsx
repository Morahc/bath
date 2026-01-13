"use client";

import { Plus } from "lucide-react";

import { useProduct } from "@/context/product-context";
import { Button } from "@/components/ui/button";

export default function ProductButtons() {
  const { setOpen, setCurrentRow } = useProduct();

  return (
    <Button
      onClick={() => {
        setCurrentRow(undefined);
        setOpen("create");
      }}
    >
      Create <Plus />
    </Button>
  );
}
