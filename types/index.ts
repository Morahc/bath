import { Database } from "@/database.types";

type ProductBase = Database["public"]["Tables"]["collections"]["Row"]

export type Product = Omit<ProductBase, "category"> & {
  category: Category
}

export type Category = Database["public"]["Tables"]["categories"]["Row"]