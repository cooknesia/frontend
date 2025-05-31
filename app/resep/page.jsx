import FilterPanel from "@/components/recipes/filter-panel";
import { RecipeList } from "@/components/recipes/recipe-list";
import { Suspense } from "react";

export default function RecipesPage() {
  return (
    <div className="container mx-auto px-4 py-8 relative top-0">
      <h1 className="text-3xl font-bold mb-6">Jelajahi Resep Indonesia</h1>

      <div className="mb-6"></div>

      <Suspense
        fallback={<div className="text-center">Loading recipes...</div>}
      >
        <div className="grid md:grid-cols-[250px_1fr] gap-6">
          <FilterPanel />
          <RecipeList />
        </div>
      </Suspense>
    </div>
  );
}
