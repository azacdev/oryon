import { Products } from "@/types/types";
import NoResults from "@/components/ui/no-results";
import ProductCard from "@/components/ui/product-card";
import { Suspense } from "react";
import { ProductCardSkeleton } from "@/components/product-card-skeleton";

interface ProductListProps {
  title: string;
  description?: string;
  items: Products[];
}

const ProductList = ({ title, description, items }: ProductListProps) => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-bold text-3xl">{title}</h3>
        <p className="text-gray-500 text-2xl">{description}</p>
      </div>
      {items.length === 0 && <NoResults />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <Suspense
          fallback={Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        >
          {items.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </Suspense>
      </div>
    </div>
  );
};

export default ProductList;
