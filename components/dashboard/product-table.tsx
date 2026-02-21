"use client";

import { Ellipsis, SquarePen, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useProduct } from "@/context/product-context";
import { cn, formatter } from "@/lib/utils";
import { Product } from "@/types";
import Image from "next/image";
import { useMemo, useState } from "react";

interface DataTableProps {
  data: Product[];
}

export function ProductTable({ data }: DataTableProps) {
  const [searchValue, setSearchValue] = useState("");

  const filteredProducts = useMemo(() => {
    if (!searchValue) return data;

    return data.filter((product) => product.name.toLowerCase().includes(searchValue.toLowerCase()));
  }, [data, searchValue]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-start gap-2 sm:flex-row sm:items-center sm:space-x-2">
          <Input
            placeholder="Filter products..."
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            className="w-full md:w-80 bg-white"
          />
        </div>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead>Price</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <div className="flex items-center gap-x-3 w-max">
                    <Image
                      src={process.env.NEXT_PUBLIC_SUPABASE_IMAGE_URL + row.image}
                      alt={row.name}
                      width={60}
                      height={50}
                      className="object-cover aspect-square"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <span>{row.name}</span>
                  </div>
                </TableCell>
                <TableCell>{row.category.label}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>
                  <span
                    className={cn(
                      row.featured ? "bg-green-500" : "bg-destructive",
                      "h-5 capitalize text-muted rounded-full px-3 flex items-center justify-center w-fit text-xs font-semibold",
                    )}
                  >
                    {String(row.featured)}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="font-medium">{formatter.format(row.price)}</span>
                </TableCell>
                <TableCell>
                  <ProductAction product={row} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

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
