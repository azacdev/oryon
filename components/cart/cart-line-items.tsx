import Image from "next/image";
import { Slot } from "@radix-ui/react-slot";
import { cn, formatter } from "@/lib/utils";
import { Products } from "@/types/types";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Icons } from "@/components/icons";
import { UpdateCart } from "@/components/cart/update-cart";

interface CartLineItemsProps extends React.HTMLAttributes<HTMLDivElement> {
  items: Products[];
  isScrollable?: boolean;
  isEditable?: boolean;
}

export function CartLineItems({
  items,
  isScrollable = true,
  isEditable = true,
  className,
  ...props
}: CartLineItemsProps) {
  const Comp = isScrollable ? ScrollArea : Slot;

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
                "flex items-start justify-between gap-4 flex-col sm:flex-row"
              )}
            >
              <div className="flex items-center space-x-4">
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
                      className="absolute object-cover -z10"
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
                <div className="flex flex-col space-y-1 self-start">
                  <span className="line-clamp-1 text-sm font-medium">
                    {item.name}
                  </span>

                  <span className="line-clamp-1 text-xs">
                    NGN {Number(item.price).toLocaleString()} x {item.quantity}{" "}
                    ={" "}
                    {(
                      Number(item.price) * Number(item.quantity)
                    ).toLocaleString()}
                  </span>

                  <div className="flex gap-x-3">
                    <span className="line-clamp-1 text-xs capitalize text-muted-foreground">
                      {item.size.name}
                    </span>
                    <span className="line-clamp-1 text-xs capitalize text-muted-foreground">
                      {item.color.name}
                    </span>
                  </div>
                </div>
              </div>
              <UpdateCart data={item} />
            </div>
            <Separator />
          </div>
        ))}
      </div>
    </Comp>
  );
}
