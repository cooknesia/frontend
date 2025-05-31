"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getPopularFoods } from "@/lib/api/api";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import RecipeLayout from "./layout/recipe-layout";
import { RecipeCard } from "./recipe-card";

export function PopularRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPopularRecipes = async () => {
      try {
        const { data } = await getPopularFoods();
        setRecipes(data);
      } catch (error) {
        console.error("Gagal mengambil resep populer:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getPopularRecipes();
  }, []);

  if (isLoading) {
    return (
      <RecipeLayout>
        {Array(15)
          .fill(0)
          .map(() => (
            <Card key={nanoid()} className="overflow-hidden h-full">
              <CardHeader className="p-0">
                <Skeleton className="h-[200px] w-full rounded-t-lg" />
              </CardHeader>
              <CardContent className="p-4 space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
              </CardContent>
            </Card>
          ))}
      </RecipeLayout>
    );
  }

  return (
    <RecipeLayout>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </RecipeLayout>
  );
}
