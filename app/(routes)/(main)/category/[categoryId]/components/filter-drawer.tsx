"use client";

import { useState } from "react";

import { Color, Products, Size } from "@/types/types";

import Filter from "./filter";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

interface FilterDrawerProps {
  sizes: Size[];
  colors: Color[];
}

const FilterDrawer = ({ sizes, colors }: FilterDrawerProps) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="default" className="max-w-[80px]">Filter</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Move Goal</DrawerTitle>
          </DrawerHeader>

          <div className="flex flex-col space-y-2 p-4">
            <Filter valueKey="sizeId" name="Sizes" data={sizes} />
            <Filter valueKey="colorId" name="Colors" data={colors} />
            {/* <Card className="space-y-4 rounded-lg p-3">
              <h3 className="text-sm font-medium tracking-wide text-foreground">
                Price range (NGN)
              </h3>
              <Slider
                variant="range"
                thickness="thin"
                defaultValue={[0, 500]}
                max={500}
                step={1}
                value={priceRange}
                onValueChange={(value: typeof priceRange) =>
                  setPriceRange(value)
                }
              />
              <div className="flex items-center space-x-4">
                <Input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  max={priceRange[1]}
                  value={priceRange[0]}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    setPriceRange([value, priceRange[1]]);
                  }}
                />
                <span className="text-muted-foreground">-</span>
                <Input
                  type="number"
                  inputMode="numeric"
                  min={priceRange[0]}
                  max={500}
                  value={priceRange[1]}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    setPriceRange([priceRange[0], value]);
                  }}
                />
              </div>
            </Card> */}
          </div>

          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default FilterDrawer;
