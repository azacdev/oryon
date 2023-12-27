"use client";

import { cn } from "@/lib/utils";
import { Category } from "@/types/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MainNavProps {
  categories: Category[];
}

const MainNav = ({ categories }: MainNavProps) => {
  const pathname = usePathname();

  const routes = categories.map((category) => ({
    href: `/category/${category.id}`,
    label: category.name,
    active: pathname === `/category/${category.id}`,
  }));

  return (
    <nav className="mx-6 flex items-center space-x-4 lg:space-x-6">
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
    </nav>
  );
};

export default MainNav;
