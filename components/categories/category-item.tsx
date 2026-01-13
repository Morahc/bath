"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Category } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCategory } from "@/context/category-context";
import { Ellipsis, SquarePen, Trash } from "lucide-react";

type Props = Category;

export default function CategoryItem(props: Props) {
  return (
    <div className="group cursor-pointer md:space-y-4">
      <div className="relative overflow-hidden rounded-sm bg-secondary aspect-4/3">
        <Image
          src={process.env.NEXT_PUBLIC_SUPABASE_IMAGE_URL + props.image}
          alt={props.label}
          fill
          loading="eager"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-sm text-foreground">{props.label}</h3>
        <CategoryAction category={props} />
      </div>
    </div>
  );
}

type CategoryActionProps = {
  category: Category;
};

function CategoryAction({ category }: CategoryActionProps) {
  const { setCurrentRow, setOpen } = useCategory();

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
            setCurrentRow(category);
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
            setCurrentRow(category);
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
