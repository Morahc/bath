"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCategory } from "@/context/category-context";

export default function CategoryButtons() {
  const { setOpen, setCurrentRow } = useCategory();

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
