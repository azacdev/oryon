"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

import useCart from "@/hooks/use-cart";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import Currency from "@/components/ui/currency";
import { CartLineItems } from "@/components/cart/cart-line-items";

const CheckoutCart = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const items = useCart((state) => state.cart);
  const totalPrice = useCart((state) => state.totalPrice);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="w-full flex-1 lg:flex-initial space-y-12 pt-8 lg:pt-16">
      <div className="fixed top-0 z-40 h-16 w-full bg-[#09090b] py-4 lg:static lg:top-auto lg:z-0 lg:h-0 lg:py-0">
        <div className="container flex max-w-xl items-center justify-between space-x-2 ">
          <Link
            aria-label="Back to home"
            href="/"
            className="group flex w-28 items-center space-x-2 lg:flex-auto"
          >
            <ArrowLeftIcon
              className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary"
              aria-hidden="true"
            />
            <div className="block font-medium transition group-hover:hidden">
              Oryon
            </div>
            <div className="hidden font-medium transition group-hover:block">
              Back
            </div>
          </Link>
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline" size="sm">
                Details
              </Button>
            </DrawerTrigger>
            <DrawerContent className="mx-auto flex h-[82%] w-full max-w-4xl flex-col space-y-6 border pb-6 pt-8">
              <CartLineItems
                items={items}
                isEditable={false}
                className="container h-full flex-1 pr-8"
              />
              <div className="container space-y-4 pr-8">
                <Separator />
                <div className="flex font-medium">
                  <div className="flex-1">
                    Total <Currency value={totalPrice()} />
                  </div>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
      <div className="container flex max-w-xl flex-col items-center space-y-1  lg:items-start">
        <div className="line-clamp-1 font-semibold text-muted-foreground">
          Pay Oryon
        </div>
        <Currency value={totalPrice()} />
      </div>
      <CartLineItems
        items={items}
        isEditable={false}
        className="container hidden w-full max-w-xl  lg:flex lg:max-h-[580px] "
      />
    </div>
  );
};

export default CheckoutCart;
