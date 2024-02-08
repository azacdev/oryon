"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Category } from "@/types/types";
import { cn } from "@/lib/utils";

interface DesktopNavProps {
  categories: Category[];
}

export const revalidate = 0;

const DesktopNav = ({ categories }: DesktopNavProps) => {
  const pathname = usePathname();

  const routes = categories.map((category) => ({
    href: `/category/${category.id}`,
    label: category.name,
    active: pathname === `/category/${category.id}`,
  }));

  return (
    <div className="mx-6 items-center space-x-4 lg:space-x-6 hidden lg:flex">
      {routes.map((route) => (
        <Link
          href={route.href}
          key={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-black",
            route.active ? "text-black" : "text-neutral-500"
          )}
        >
          {route.label}
        </Link>
      ))}
    </div>
  );
};

export default DesktopNav;
