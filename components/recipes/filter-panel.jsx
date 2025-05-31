"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Filter } from "lucide-react";
import { useParams } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { RecipeFilters } from "./recipe-filters";
import SearchBar from "./search-bar";

export default function FilterPanel() {
  const params = useParams();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      setOpen(false);
    }
  }, [params]);

  return (
    <Fragment>
      <div className="md:hidden mb-4 fixed bottom-16 right-4 z-50">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button className="h-14 w-14 rounded-full border border-white shadow-lg bg-primary hover:bg-primary/90">
              <Filter className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="w-full sm:w-[300px]">
            <SheetTitle className="hidden"></SheetTitle>
            <SheetHeader>
              <h2 className="text-lg font-semibold">Filter Resep</h2>
            </SheetHeader>
            <div className="mt-4 space-y-4">
              <SearchBar placeholder="Cari resep..." />
              <RecipeFilters />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <aside className="hidden md:flex flex-col gap-4 sticky top-20 self-start h-fit bg-white z-20">
        <SearchBar />
        <RecipeFilters />
      </aside>
    </Fragment>
  );
}
