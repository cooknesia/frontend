"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Delete, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("keyword") || "");

  const handleSearch = (e) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());

    if (query) {
      params.set("keyword", query);
      params.set("page", "1");
    } else {
      params.delete("keyword");
    }

    router.push(`/resep?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex flex-col w-full gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Cari Resep..."
          className="pl-9 border-red-800 focus-visible:ring-0"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <Delete
            onClick={() => setQuery("")}
            className="cursor-pointer hover:text-red-800 absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          />
        )}
      </div>
      <Button type="submit">Cari</Button>
    </form>
  );
}
