"use client";

import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Category } from "@/types";

type Props = {
  categories: Category[];
};

export default function Categories({ categories }: Props) {
  return (
    <section id="products" className="py-8 md:py-24 bg-secondary">
      <div className="w-full max-w-7xl mx-auto space-y-6 md:space-y-12 px-4">
        <div className="md:text-center space-y-2">
          <h2 className="text-2xl font-medium text-foreground">Our Product Collections</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Browse our carefully selected bathroom fixtures and accessories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6">
          {categories.map((category) => (
            <div key={category.id} className="group cursor-pointer space-y-4">
              <div className="relative overflow-hidden rounded-sm bg-secondary aspect-4/3">
                <Image
                  src={process.env.NEXT_PUBLIC_SUPABASE_IMAGE_URL + category.image}
                  alt={category.label}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm text-foreground">{category.label}</h3>
                <Link
                  href={`/collections?category=${category.value}`}
                  className={cn(
                    buttonVariants({ variant: "link", size: "link" }),
                    "text-xs font-medium"
                  )}
                >
                  View collection
                  <span>→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
