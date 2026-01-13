"use client";

import React, { useState } from "react";
import { Product } from "@/types";
import useDialogState from "@/hooks/use-dialog-state";

type ProductDialogType = "update" | "create" | "delete";

interface ProductContextType {
  open: ProductDialogType | null;
  setOpen: (str: ProductDialogType | null) => void;
  currentRow: Product | undefined;
  setCurrentRow: React.Dispatch<React.SetStateAction<Product | undefined>>;
}

const ProductContext = React.createContext<ProductContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

export default function ProductProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<ProductDialogType>(null);
  const [currentRow, setCurrentRow] = useState<Product | undefined>(undefined);
  return (
    <ProductContext value={{ open, setOpen, currentRow, setCurrentRow }}>{children}</ProductContext>
  );
}

export const useProduct = () => {
  const productContext = React.useContext(ProductContext);

  if (!productContext) {
    throw new Error("useProduct has to be used within <ProductContext>");
  }

  return productContext;
};
