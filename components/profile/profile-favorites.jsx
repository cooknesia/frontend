"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";
import RecipeLayout from "../layout/recipe-layout";
import { RecipeCard } from "../recipe-card";
import RecipeListSkeleton from "../recipes/recipe-sekeleton";

export default function ProfileFavorites({ favorites, isLoading }) {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-2">
          <RecipeLayout>
            <RecipeListSkeleton count={6} />
          </RecipeLayout>
        </CardContent>
      </Card>
    );
  }

  if (favorites.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Resep Favorit
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-gray-500">
            <Heart className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">
              Belum ada resep favorit
            </h3>
            <p className="text-sm">
              Mulai tambahkan resep ke favorit untuk melihatnya di sini
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-2">
        <RecipeLayout className="">
          {favorites.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </RecipeLayout>
      </CardContent>
    </Card>
  );
}
