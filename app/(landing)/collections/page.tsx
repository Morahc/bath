import { redirect } from "next/navigation";

import { getCategories } from "@/actions/category";
import { getCollections } from "@/actions/collections";
import CategoryFilter from "@/components/category-filter";
import ContactUs from "@/components/collection/contact-us";
import PagePagination from "@/components/dashboard/pagination";
import ProductList from "@/components/product-list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Collections",
  description: "Explore our luxury bathroom collections.",
  alternates: {
    canonical: "https://classicluxurybathrooms.com/collections",
  },
};

export default async function ProductPage({
  searchParams,
}: {
  searchParams: Promise<{ page: number; category: string | undefined }>;
}) {
  const search = await searchParams;
  const page = Number(search.page) || 1;
  const category = search.category;

  const { data, pagination } = await getCollections({
    page,
    pageSize: 15,
    category,
  });

  const categories = await getCategories();

  if (pagination.isOutOfBounds) {
    redirect(`/collections?page=${pagination.page}`);
  }

  return (
    <div className="bg-secondary grow">
      <div className="space-y-6 lg:space-y-12 pb-6 lg:pb-12 max-w-7xl mx-auto px-4">
        <div className="bg-secondary text-center space-y-4 pt-4 md:pt-8">
          <h1 className="text-4xl font-semibold">The Collection</h1>
          <p className="text-sm md:text-lg max-w-3xl mx-auto">
            Discover our curated collection of premium bathroom fixtures. From luxury tubs to
            designer toilets, every piece is selected for superior craftsmanship and timeless
            elegance.
          </p>
        </div>
        <div className="space-y-6 max-w-7xl mx-auto w-full">
          <CategoryFilter categories={categories} />
          <ProductList data={data} />
          <PagePagination currentPage={page} totalPages={pagination.totalPages} baseUrl="" />
        </div>
        <ContactUs />
      </div>
    </div>
  );
}
