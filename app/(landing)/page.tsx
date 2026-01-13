import { getCategories } from "@/actions/category";
import { getCollections } from "@/actions/collections";
import Categories from "@/components/landing/categories";
import Contact from "@/components/landing/contact";
import Featured from "@/components/landing/featured";
import Hero from "@/components/landing/hero";

export default async function Home() {
  const { data: featured } = await getCollections({ featured: true });
  const categories = await getCategories();

  return (
    <div>
      <Hero />
      <Categories categories={categories} />
      <Featured featured={featured} />
      <Contact />
    </div>
  );
}
