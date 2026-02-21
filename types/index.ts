export type Product = {
  category: Category
  created_at: string
  updated_at: string
  description: string
  id: string
  image: string
  name: string
  price: number
  featured: boolean
}

export type Category = {
  created_at: string
  updated_at: string
  id: number
  image: string
  label: string
  value: string
}