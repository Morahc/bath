"use client";

import React, { useState } from "react";
import { Category } from "@/types";
import useDialogState from "@/hooks/use-dialog-state";

export type CategoryDialogType = "update" | "create" | "delete";

interface CategoryContextType {
  open: CategoryDialogType | null;
  setOpen: (str: CategoryDialogType | null) => void;
  currentRow: Category | undefined;
  setCurrentRow: React.Dispatch<React.SetStateAction<Category | undefined>>;
}

const CategoryContext = React.createContext<CategoryContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

export default function CategoryProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<CategoryDialogType>(null);
  const [currentRow, setCurrentRow] = useState<Category | undefined>(undefined);
  return (
    <CategoryContext value={{ open, setOpen, currentRow, setCurrentRow }}>{children}</CategoryContext>
  );
}

export const useCategory = () => {
  const categoryContext = React.useContext(CategoryContext);

  if (!categoryContext) {
    throw new Error("useProduct has to be used within <CategoryContext>");
  }

  return categoryContext;
};
