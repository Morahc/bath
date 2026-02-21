"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { formatter } from "@/lib/utils";
import { Product } from "@/types";
import { buttonVariants } from "./ui/button";
import { Separator } from "./ui/separator";

export default function ProductCard({ name, description, price, image, category }: Product) {
  return (
    <Card className="group gap-0 py-0 w-full overflow-hidden border-0 shadow-lg">
      <CardContent className="relative aspect-4/3 p-0 overflow-hidden">
        <Image
          src={process.env.NEXT_PUBLIC_SUPABASE_IMAGE_URL + image}
          alt={name}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="group-hover:scale-105 object-cover transition-transform duration-300"
          loading="eager"
          fill
        />
      </CardContent>
      <CardFooter className="flex-col gap-2 pt-2 pb-4">
        <div>
          <div className="flex justify-between items-center">
            <h1 className="md:text-lg font-medium">{name}</h1>
            <span className="text-xs font-light border border-input rounded px-2">
              {category.label}
            </span>
          </div>
          <p className="text-primary/70 text-sm truncate max-w-max">{description}</p>
        </div>
        <Separator orientation="horizontal" />
        <div className="flex items-center justify-between ">
          <p className="text-sm font-medium text-foreground">{formatter.format(price)}</p>
          <Link href={"/"} className={buttonVariants({ size: "link", variant: "link" })}>
            Inquire <ArrowRight />
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
