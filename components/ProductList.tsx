import { Products } from "@/types/types";
import NoResults from "@/components/ui/NoResults";

interface ProductListProps {
  title: string;
  items: Products[];
}

const ProductList = ({ title, items }: ProductListProps) => {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-3xl">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>
      {items.length === 0 && <NoResults />}
    </div>
  );
};

export default ProductList;
