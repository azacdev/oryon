"use client";

import Image from "next/image";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { EyeOpenIcon } from "@radix-ui/react-icons";

import { Products } from "@/types/types";
import Currency from "@/components/ui/currency";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { AspectRatio } from "./aspect-ratio";
import { PlaceholderImage } from "../placeholder-image";
import { Button, buttonVariants } from "@/components/ui/button";

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  data: Products;
}

const ProductCard = ({ data, className, ...props }: ProductCardProps) => {

  return (
    <Card
      className={cn("h-full w-full overflow-hidden rounded-sm", className)}
      {...props}
    >
      <Link href={`/data/${data.id}`}>
        <CardHeader className="border-b p-0">
          <AspectRatio ratio={4 / 3}>
            {data.images?.length ? (
              <Image
                src={data.images[0]?.url}
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
        <span className="sr-only">{data.name}</span>
      </Link>
      <Link href={`/data/${data.id}`} tabIndex={-1}>
        <CardContent className="space-y-1.5 p-4">
          <CardTitle className="line-clamp-1">{data.name}</CardTitle>
          <CardDescription className="line-clamp-1">
            <Currency value={data?.price} />
          </CardDescription>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-1">
        <div className="flex w-full items-center space-x-2">
          <Button
            size="sm"
            className="h-8 w-full rounded-sm"
          >
            Add to cart
          </Button>
          <Link
            href={`/preview/data/${data.id}`}
            title="Preview"
            className={cn(
              buttonVariants({
                variant: "secondary",
                size: "icon",
                className: "h-8 w-8 shrink-0",
              })
            )}
          >
            <EyeOpenIcon className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">Preview</span>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
