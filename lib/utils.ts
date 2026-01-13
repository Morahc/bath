import { clsx, type ClassValue } from "clsx"
import { ReadonlyURLSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0
});

export const slugify = (str: string) => {
  return str.toLowerCase().split(" ").join('-')
}

export const createQueryString = (searchParams: ReadonlyURLSearchParams, name: string, value: string | number) => {
  const params = new URLSearchParams(searchParams.toString());

  if (value === "") {
    params.delete(name);
  } else {
    params.set(name, String(value));
  }

  return params.toString();
};