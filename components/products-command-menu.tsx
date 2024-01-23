"use client";

import { useRouter } from "next/navigation";
import { CircleIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Skeleton } from "@/components/ui/skeleton";
import { Products } from "@/types/types";
import { useCallback, useEffect, useState, useTransition } from "react";
import getSearchProducts from "@/actions/get-search-products";
import { useDebounce } from "@/hooks/use-debounce";
import { cn, isMacOs } from "@/lib/utils";

export function ProductsCommandMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const [data, setData] = useState<Products[] | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (debouncedQuery.length <= 0) {
      setData(null);
      return;
    }

    async function fetchData() {
      try {
        const data = await getSearchProducts(debouncedQuery);
        setData(data);
      } catch (err) {
        console.log(err);
      }
    }

    startTransition(fetchData);

    return () => setData(null);
  }, [debouncedQuery]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSelect = useCallback((callback: () => unknown) => {
    setOpen(false);
    callback();
  }, []);

  useEffect(() => {
    if (!open) {
      setQuery("");
    }
  }, [open]);

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2"
        onClick={() => setOpen(true)}
      >
        <MagnifyingGlassIcon className="h-4 w-4 xl:mr-2" aria-hidden="true" />
        <span className="hidden xl:inline-flex">Search products...</span>
        <span className="sr-only">Search products</span>
        <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium opacity-100 xl:flex">
          <abbr
            title={isMacOs() ? "Command" : "Control"}
            className="no-underline"
          >
            {isMacOs() ? "⌘" : "Ctrl"}
          </abbr>
          K
        </kbd>
      </Button>
      <CommandDialog position="top" open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search products..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          <CommandEmpty
            className={cn(isPending ? "hidden" : "py-6 text-center text-sm")}
          >
            No products found.
          </CommandEmpty>
          {isPending ? (
            <div className="space-y-1 overflow-hidden px-1 py-2">
              <Skeleton className="h-4 w-10 rounded" />
              <Skeleton className="h-8 rounded-sm" />
              <Skeleton className="h-8 rounded-sm" />
            </div>
          ) : (
            data?.map((item) => (
              <CommandGroup
                key={item.id}
                className="capitalize"
                heading={item.category.name}
              >
                <CommandItem
                  key={item.id}
                  value={item.name}
                  onSelect={() =>
                    handleSelect(() => router.push(`/product/${item.id}`))
                  }
                  className="hover:cursor-pointer"
                >
                  <span className="truncate">{item.name}</span>
                </CommandItem>
              </CommandGroup>
            ))
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
