"use client";

import { useProduct } from "@/context/product-context";
import { Confirm } from "./confirm";
import { ProductSheet } from "./product-sheet";
import { useTransition } from "react";
import { deleteCollection } from "@/actions/collections";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ProductDialogs() {
  const router = useRouter();

  const { open, setOpen, currentRow } = useProduct();
  const [isPending, startTransition] = useTransition();

  const handleDelete = (id: string) => {
    startTransition(async () => {
      try {
        await deleteCollection(id);

        setOpen(null);
        router.refresh();
      } catch {
        toast.error("Failed to delete collection item");
      }
    });
  };

  return (
    <>
      {currentRow && (
        <>
        <Confirm
          title="Delete this item"
          description="This action cannot be undone. This will permanently delete item and remove your data from our servers."
          isLoading={isPending}
          open={open === "delete"}
          onOpenChange={() => setOpen("delete")}
          handleConfirm={() => handleDelete(currentRow.id)}
        />
      <ProductSheet
        open={open === "update"}
        setOpen={() => setOpen("update")}
        currentRow={currentRow}
      />
      </>
      )
      }
      <ProductSheet open={open === "create"} setOpen={() => setOpen("create")} />
    </>
  );
}
