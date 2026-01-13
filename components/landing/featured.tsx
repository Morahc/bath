import { Product } from "@/types";
import ProductCard from "../product-card";

type Props = {
  featured: Product[];
};

export default function Featured({ featured }: Props) {
  return (
    <section id="featured" className="py-8 md:py-24 border-y">
      <div className="w-full max-w-7xl mx-auto space-y-6 md:space-y-12 px-4">
        <div className="md:text-center space-y-2">
          <h2 className="text-xl font-medium text-foreground">Our Featured Products</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Our most sought-after luxury bathroom fixtures
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 w-full">
          {featured.map((item) => (
            <ProductCard key={item.name} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
