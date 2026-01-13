"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Ellipsis, SquarePen, Trash } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useProduct } from "@/context/product-context";
import { Product } from "@/types";
import { cn, formatter } from "@/lib/utils";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Title",
    cell: ({ row }) => {
      const { name, image } = row.original;
      return (
        <div className="flex items-center gap-x-3 w-max">
          <Image
            src={process.env.NEXT_PUBLIC_SUPABASE_IMAGE_URL + image}
            alt={name}
            width={60}
            height={50}
            className="object-cover aspect-square"
          />
          <span>{name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "category.label",
    header: "Category",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "featured",
    header: "Featured",
    cell: ({ row }) => {
      const featured = row.original.featured;
      return (
        <span
          className={cn(
            featured ? "bg-green-500" : "bg-destructive",
            "h-5 capitalize text-muted rounded-full px-3 flex items-center justify-center w-fit text-xs font-semibold"
          )}
        >
          {String(featured)}
        </span>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => (
      <span className="font-medium">{formatter.format(row.original.price)}</span>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <ProductAction product={row.original} />,
  },
];

type ProductActionProps = {
  product: Product;
};

function ProductAction({ product }: ProductActionProps) {
  const { setCurrentRow, setOpen } = useProduct();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="data-[state=open]:bg-muted">
          <Ellipsis size={14} />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="space-y-2" align="end">
        <DropdownMenuItem
          onClick={() => {
            setCurrentRow(product);
            setOpen("update");
          }}
        >
          Edit
          <DropdownMenuShortcut>
            <SquarePen className="size-3 md:size-4" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setCurrentRow(product);
            setOpen("delete");
          }}
        >
          Delete
          <DropdownMenuShortcut>
            <Trash className="size-3 md:size-4" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
