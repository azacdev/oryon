import { useEffect, useState } from "react";
import { MinusIcon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";

import useCart from "@/hooks/use-cart";
import getProducts from "@/actions/get-products";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Products } from "@/types/types";

interface UpdateCartProps {
  data: Products;
}

export function UpdateCart({ data }: UpdateCartProps) {
  const cart = useCart();
  const [product, setProduct] = useState<Products | undefined>();

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getProducts({ isFeatured: true });
      setProduct(fetchedProducts.find((p) => p.id === data.id));
    };

    fetchProducts();
  }, [data.id]);

  const increaseQuantity = () => {
    cart.increaseQuantity(data.id, product.quantity);
  };

  const decreaseQuantity = () => {
    cart.decreaseQuantity(data.id);
  };

  const removeItem = () => {
    cart.removeItem(data.id);
  };

  return (
    <div className="flex w-full items-center justify-between space-x-2 sm:w-auto sm:justify-normal">
      <div className="flex items-center">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-r-none"
          onClick={decreaseQuantity}
        >
          <MinusIcon className="h-3 w-3" aria-hidden="true" />
          <span className="sr-only">Remove one item</span>
        </Button>
        <Input
          type="number"
          min="0"
          className="h-8 w-14 rounded-none border-x-0"
          value={data.quantity}
          readOnly
        />
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-l-none"
          onClick={increaseQuantity}
        >
          <PlusIcon className="h-3 w-3" aria-hidden="true" />
          <span className="sr-only">Add one item</span>
        </Button>
      </div>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={removeItem}
      >
        <TrashIcon className="h-3 w-3" aria-hidden="true" />
        <span className="sr-only">Delete item</span>
      </Button>
    </div>
  );
}
