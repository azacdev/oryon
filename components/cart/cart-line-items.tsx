import Image from "next/image";

import { Slot } from "@radix-ui/react-slot";

import { cn, formatter } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { UpdateCart } from "@/components/cart/update-cart";
import { Icons } from "@/components/icons";
import { Products } from "@/types/types";
import Currency from "../ui/currency";
import useCart from "@/hooks/use-cart";
import { TrashIcon } from "lucide-react";
import { Button } from "../ui/button";

interface CartLineItemsProps extends React.HTMLAttributes<HTMLDivElement> {
  items: Products[];
  isScrollable?: boolean;
  isEditable?: boolean;
  variant?: "default" | "minimal";
}

export function CartLineItems({
  items,
  isScrollable = true,
  isEditable = true,
  variant = "default",
  className,
  ...props
}: CartLineItemsProps) {
  const Comp = isScrollable ? ScrollArea : Slot;
  const cart = useCart();
  // const removeItem = () => cart.removeItem(item.id);

  return (
    <Comp className="h-full">
      <div
        className={cn(
          "flex w-full flex-col gap-5",
          isScrollable && "pr-6",
          className
        )}
        {...props}
      >
        {items.map((item) => (
          <div key={item.id} className="space-y-3">
            <div
              className={cn(
                "flex items-start justify-between flex-row"
              )}
            >
              <div className="flex items-center space-x-4">
                {variant === "default" ? (
                  <div className="relative aspect-square h-16 w-16 min-w-fit overflow-hidden rounded">
                    {item?.images?.length ? (
                      <Image
                        src={
                          item.images[0]?.url ??
                          "/images/product-placeholder.webp"
                        }
                        alt="product image"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        fill
                        className="absolute object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-secondary">
                        <Icons.placeholder
                          className="h-4 w-4 text-muted-foreground"
                          aria-hidden="true"
                        />
                      </div>
                    )}
                  </div>
                ) : null}
                <div className="flex flex-col space-y-1 self-start">
                  <span className="line-clamp-1 text-sm font-medium">
                    {item.name}
                  </span>

                  <p className="line-clamp-1 text-xs">
                    {formatter.format(Number(item.price))}
                  </p>

                  {variant === "default" ? (
                    <div className="flex gap-x-3">
                      <span className="line-clamp-1 text-xs capitalize text-muted-foreground">
                        {item.size.name}
                      </span>
                      <span className="line-clamp-1 text-xs capitalize text-muted-foreground">
                        {item.color.name}
                      </span>
                    </div>
                  ) : null}
                </div>
              </div>
              {/* <UpdateCart data={item} /> */}
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => cart.removeItem(item.id)}
              >
                <TrashIcon className="h-3 w-3" aria-hidden="true" />
                <span className="sr-only">Delete item</span>
              </Button>
            </div>
            {variant === "default" ? <Separator /> : null}
          </div>
        ))}
      </div>
    </Comp>
  );
}
