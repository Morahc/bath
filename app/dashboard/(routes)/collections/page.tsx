import { getCollections } from "@/actions/collections";
import PagePagination from "@/components/dashboard/pagination";
import ProductButtons from "@/components/dashboard/product-buttons";
import { columns } from "@/components/dashboard/product-column";
import ProductDialogs from "@/components/dashboard/product-dialogs";
import { ProductTable } from "@/components/dashboard/product-table";
import ProductProvider from "@/context/product-context";

export default async function Dashboard({
  searchParams,
}: {
  searchParams: Promise<{ page: number | undefined }>;
}) {
  const page = (await searchParams).page || 1;

  const { data: collections, pagination } = await getCollections({ page, pageSize: 15 });

  return (
    <ProductProvider>
      <div className="mx-auto max-w-7xl p-2 md:p-4">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl md:text-3xl font-medium tracking-wide">Manage products</h2>

            <ProductButtons />
          </div>

          <ProductTable columns={columns} data={collections} />
          <PagePagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            baseUrl="collections"
          />
        </div>
        <ProductDialogs />
      </div>
    </ProductProvider>
  );
}
