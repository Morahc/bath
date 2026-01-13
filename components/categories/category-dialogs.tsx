"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { deleteCategory } from "@/actions/category";
import { useCategory } from "@/context/category-context";
import { Confirm } from "../dashboard/confirm";
import CategoryForm from "./category-form";

export default function CategoryDialogs() {
  const router = useRouter();

  const { open, setOpen, currentRow } = useCategory();
  const [isPending, startTransition] = useTransition();

  const handleDelete = (id: number) => {
    startTransition(async () => {
      try {
        await deleteCategory(id);

        setOpen(null);
        router.refresh();
      } catch {
        toast.error("Failed to delete category");
      }
    });
  };

  return (
    <>
      {currentRow && (
        <>
          <Confirm
            title="Delete this category"
            description="This action cannot be undone. This will permanently delete item and remove your data from our servers."
            isLoading={isPending}
            open={open === "delete"}
            onOpenChange={() => setOpen("delete")}
            handleConfirm={() => handleDelete(currentRow.id)}
          />
          <CategoryForm
            open={open === "update"}
            setOpen={() => setOpen("update")}
            currentRow={currentRow}
          />
        </>
      )}
      <CategoryForm open={open === "create"} setOpen={() => setOpen("create")} />
    </>
  );
}
