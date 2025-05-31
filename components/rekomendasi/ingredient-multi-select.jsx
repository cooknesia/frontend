"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getIngredients, queryIngredients } from "@/lib/api/api";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function IngredientMultiSelect({
  selectedIngredients,
  onSelectionChange,
  button,
}) {
  const [open, setOpen] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const listRef = useRef(null);

  useEffect(() => {
    loadIngredients(1);
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      searchIngredients(searchQuery);
    } else {
      loadIngredients(1);
    }
  }, [searchQuery]);

  const loadIngredients = async (pageNum = 1) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const response = await getIngredients(pageNum); // ✅ langsung page number
      const newIngredients = response.data.ingredients || [];

      if (pageNum === 1) {
        setIngredients(newIngredients);
      } else {
        setIngredients((prev) => [...prev, ...newIngredients]);
      }

      setHasMore(newIngredients.length > 0);
      setPage(pageNum);
    } catch (error) {
      console.error("Gagal memuat bahan:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const searchIngredients = async (query) => {
    setIsLoading(true);
    try {
      const response = await queryIngredients(query);
      const results = response.data || [];
      setIngredients(results);
      setHasMore(false);
    } catch (error) {
      console.error("Gagal mencari bahan:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (ingredient) => {
    const isSelected = selectedIngredients.some(
      (item) => item.id === ingredient.id
    );

    if (isSelected) {
      onSelectionChange(
        selectedIngredients.filter((item) => item.id !== ingredient.id)
      );
    } else {
      onSelectionChange([...selectedIngredients, ingredient]);
    }
  };

  const removeIngredient = (ingredientId) => {
    onSelectionChange(
      selectedIngredients.filter((item) => item.id !== ingredientId)
    );
  };

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (
      scrollHeight - scrollTop <= clientHeight + 10 &&
      hasMore &&
      !isLoading &&
      !searchQuery
    ) {
      loadIngredients(page + 1);
    }
  };

  return (
    <div className="space-y-2 w-full">
      <Popover open={open} onOpenChange={setOpen} >
        <div className="flex gap-2 w-full">
          <PopoverTrigger asChild >
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between "
            >
              {selectedIngredients.length > 0
                ? `${selectedIngredients.length} bahan dipilih`
                : "Pilih bahan..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          {button}
        </div>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput
              placeholder="Cari bahan makanan..."
              value={searchQuery}
              onValueChange={setSearchQuery}
            />
            <CommandList>
              <CommandEmpty>
                {isLoading ? "Mencari..." : "Tidak ada bahan ditemukan."}
              </CommandEmpty>
              <CommandGroup
                className="max-h-64 overflow-auto"
                onScroll={handleScroll}
                ref={listRef}
              >
                {ingredients.map((ingredient) => {
                  const isSelected = selectedIngredients.some(
                    (item) => item.id === ingredient.id
                  );
                  return (
                    <CommandItem
                      key={ingredient.id}
                      value={ingredient.name}
                      onSelect={() => handleSelect(ingredient)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          isSelected ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {ingredient.name}
                    </CommandItem>
                  );
                })}
                {isLoading && (
                  <div className="p-2 text-center text-sm text-muted-foreground">
                    Memuat...
                  </div>
                )}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {selectedIngredients.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedIngredients.map((ingredient) => (
            <Badge
              key={ingredient.id}
              variant="secondary"
              className="bg-orange-100 text-orange-800 hover:bg-orange-200"
            >
              {ingredient.name}
              <button
                className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    removeIngredient(ingredient.id);
                  }
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onClick={() => removeIngredient(ingredient.id)}
              >
                <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
