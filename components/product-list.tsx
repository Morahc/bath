"use client";

import ProductCard from "@/components/product-card";
import { Product } from "@/types";
import { PackageOpen } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

type ProductListProps = {
  data: Product[];
};

export default function ProductList({ data }: ProductListProps) {
  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="rounded-full bg-gray-100 p-6 mb-4">
          <PackageOpen className="size-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">No products available</h3>
        <p className="text-gray-500 text-sm text-center max-w-md mb-6">
          There are no products in this collection yet. Check back later or explore other
          collections.
        </p>
        <Link href="/collections" className={buttonVariants({ size: "lg" })}>
          Browse Collections
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 w-full">
        {data.map((item) => (
          <ProductCard key={item.name} {...item} />
        ))}
      </div>
    </div>
  );
}
