"use client";

import { useRef, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { createQueryString } from "@/lib/utils";
import { cn } from "@/lib/utils";

type Props = {
  categories: { value: string; label: string }[];
};

export default function CategoryFilter({ categories }: Props) {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    checkScroll();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll);
      return () => {
        container.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, [categories]);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex items-center gap-2 max-w-2xl w-full mx-auto">
      <Button
        variant="outline"
        size="icon"
        onClick={() => scroll("left")}
        disabled={!canScrollLeft}
        className={cn(
          "shrink-0 transition-opacity",
          !canScrollLeft && "opacity-0 pointer-events-none"
        )}
        aria-label="Scroll left"
      >
        <ChevronLeft className="size-4" />
      </Button>

      <div
        ref={scrollContainerRef}
        className="flex gap-2 md:gap-4 items-center overflow-x-auto scrollbar-hide flex-1"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <Link
          href={`?${createQueryString(searchParams, "category", "")}`}
          className={cn(
            buttonVariants({
              variant: !selectedCategory ? "default" : "outline",
            }),
            "whitespace-nowrap shrink-0"
          )}
        >
          All
        </Link>
        {categories.map((category) => (
          <Link
            href={`?${createQueryString(searchParams, "category", category.value)}`}
            key={category.value}
            className={cn(
              buttonVariants({
                variant: selectedCategory === category.value ? "default" : "outline",
              }),
              "whitespace-nowrap shrink-0"
            )}
          >
            {category.label}
          </Link>
        ))}
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={() => scroll("right")}
        disabled={!canScrollRight}
        className={cn(
          "shrink-0 transition-opacity",
          !canScrollRight && "opacity-0 pointer-events-none"
        )}
        aria-label="Scroll right"
      >
        <ChevronRight className="size-4" />
      </Button>
    </div>
  );
}
