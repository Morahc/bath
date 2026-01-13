import { getCategories } from "@/actions/category";
import CategoryButtons from "@/components/categories/category-buttons";
import CategoryDialogs from "@/components/categories/category-dialogs";
import CategoryItem from "@/components/categories/category-item";
import CategoryProvider from "@/context/category-context";

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <CategoryProvider>
      <div className="mx-auto max-w-7xl p-2 md:p-4">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl md:text-3xl font-medium tracking-wide">Manage categories</h2>
            <CategoryButtons />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {categories.map((category) => (
              <CategoryItem key={category.id} {...category} />
            ))}
          </div>
        </div>
        <CategoryDialogs />
      </div>
    </CategoryProvider>
  );
}
