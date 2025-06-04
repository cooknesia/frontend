import { FavoritesList } from "@/components/favorites-list";
import { ProtectedRoute } from "@/components/protected-route";
import RecipeListSkeleton from "@/components/recipes/recipe-sekeleton";
import { Suspense } from "react";

export default function FavoritesPage() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Resep Favorit Anda</h1>

        <Suspense fallback={<RecipeListSkeleton count={6} />}>
          <FavoritesList />
        </Suspense>
      </div>
    </ProtectedRoute>
  );
}
