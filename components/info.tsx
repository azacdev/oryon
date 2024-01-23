"use client";

import { Products } from "@/types/types";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Currency from "@/components/ui/currency";
import { Separator } from "@/components/ui/separator";
import { Button } from "./ui/button";
import useCart from "@/hooks/use-cart";
import { MouseEventHandler } from "react";
import { UpdateCart } from "./cart/update-cart";

interface InfoProps {
  product: Products;
}
const Info = ({ product }: InfoProps) => {
  const cart = useCart();
  const items = useCart((state) => state.cart);

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    cart.addItem(product);
  };

  return (
    <div className="flex w-full flex-col gap-4 md:w-1/2">
      <div className="space-y-2">
        <h2 className=" text-2xl font-bold">{product.name}</h2>
        <p className="text-base">
          <Currency value={product?.price} />
        </p>
      </div>
      <Separator />

      <div className="flex items-center gap-x-4">
        <h2 className="font-semibold">Size:</h2>
        <span>{product?.size?.name}</span>
      </div>

      <div className="flex items-center gap-x-4">
        <h2 className="font-semibold">Color:</h2>
        <div
          className="h-6 w-6 rounded-full border border-gray-600"
          style={{ backgroundColor: product?.color?.value }}
        />
      </div>

      <div>
        <p className="text-base">{product.quantity} in stock</p>
      </div>

      <div className="">
        <Button variant="default" onClick={onAddToCart}>
          Add to cart
        </Button>
      </div>
      {/* <UpdateCart data={items} /> */}
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="description"
      >
        <AccordionItem value="description" className="border-none">
          <AccordionTrigger>Description</AccordionTrigger>
          <AccordionContent>
            {product.description ??
              "No description is available for this product."}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Separator className="md:hidden" />
    </div>
  );
};

export default Info;
