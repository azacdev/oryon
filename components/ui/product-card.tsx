"use client";

import { MouseEventHandler } from "react";
import Link from "next/link";
import Image from "next/image";
import { EyeOpenIcon } from "@radix-ui/react-icons";

import useCart from "@/hooks/use-cart";
import { Products } from "@/types/types";
import usePreviewModal from "@/hooks/use-preview-modals";
import { cn } from "@/lib/utils";

import Currency from "@/components/ui/currency";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { PlaceholderImage } from "@/components/placeholder-image";
import { Button } from "@/components/ui/button";

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  product: Products;
}

const ProductCard = ({ product, className, ...props }: ProductCardProps) => {
  const cart = useCart();
  const previewModal = usePreviewModal();

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    cart.addItem(product);
  };

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    previewModal.onOpen(product);
  };

  return (
    <Card
      className={cn("h-full w-full overflow-hidden rounded-sm", className)}
      {...props}
    >
      <Link href={`/product/${product.id}`}>
        <CardHeader className="border-b p-0">
          <AspectRatio ratio={4 / 3}>
            {product.images?.length ? (
              <Image
                src={product.images[0]?.url}
                alt="Image"
                className="aspect-square object-cover"
                fill
                loading="lazy"
              />
            ) : (
              <PlaceholderImage className="rounded-none" asChild />
            )}
          </AspectRatio>
        </CardHeader>
        <span className="sr-only">{product.name}</span>
      </Link>
      <Link href={`/product/${product.id}`} tabIndex={-1}>
        <CardContent className="space-y-1.5 p-4">
          <CardTitle className="line-clamp-1">{product.name}</CardTitle>
          <CardDescription className="line-clamp-1">
            <Currency value={product?.price} />
          </CardDescription>
        </CardContent>
      </Link>
      <CardFooter className="p-4">
        <div className="flex w-full items-center space-x-2">
          <Button
            size="sm"
            className="h-8 w-full rounded-sm"
            onClick={onAddToCart}
          >
            Add to cart
          </Button>
          <Button
            variant="outline"
            className="h-8 w-12"
            title="Preview"
            onClick={onPreview}
          >
            <EyeOpenIcon className="h-4 w-4 text-black" aria-hidden="true" />
            <span className="sr-only">Preview</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
