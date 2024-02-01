import { Products } from "@/types/types";
import NoResults from "@/components/ui/no-results";
import ProductCard from "@/components/ui/product-card";
import { Suspense } from "react";
import { ProductCardSkeleton } from "@/components/skeletons/product-card-skeleton";

interface ProductListProps {
  title: string;
  description?: string;
  items: Products[];
}

const ProductList = ({ title, description, items }: ProductListProps) => {
  return (
    <div className="space-y-4">
      <div className="max-w-[58rem] flex-1 space-y-1">
        <h3 className="font-heading text-3xl font-bold leading-[1.1] md:text-4xl">
          {title}
        </h3>
        <p className="max-w-[46rem] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          {description}
        </p>
      </div>
      {items.length === 0 && <NoResults />}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
