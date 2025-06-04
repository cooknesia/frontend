"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/auth-context";
import { useToast } from "@/hooks/use-toast";
import { useFoodsStore } from "@/store/use-foods";
import { Eye } from "lucide-react";
import { nanoid } from "nanoid";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import RecipeLayout from "./layout/recipe-layout";
import FavoriteButton from "./recipe-detail/favorite-button";

export function FavoritesList() {
  const { user, token } = useAuth();
  const { loading, handleFavorite, favoriteFoods, fetchFavorites } =
    useFoodsStore();
  const { toast } = useToast();

  useEffect(() => {
    if (!user || !token) return;
    fetchFavorites(user.id, token);
  }, [user, token, fetchFavorites]);

  const isLogin = (id) => {
    if (user) {
      handleFavorite(user.id, token, id);
    } else {
      toast({
        title: "Anda perlu masuk",
        description: "Silakan masuk untuk menambahkan ke favorite.",
        variant: "warning",
      });
    }
  };

  if (loading) {
    return (
      <div className="w-full grid grid-cols-4 gap-2">
        {Array(6)
          .fill(0)
          .map(() => (
            <Card key={nanoid()}>
              <CardHeader className="p-0">
                <Skeleton className="h-[200px] w-full rounded-t-lg" />
              </CardHeader>
              <CardContent className="p-4 space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
              </CardContent>
            </Card>
          ))}
      </div>
    );
  }

  if (favoriteFoods.length === 0) {
    return (
      <div className="text-center py-12 border-2 border-dashed rounded-xl">
        <h3 className="text-xl font-medium mb-2">Belum ada resep favorit</h3>
        <p className="text-muted-foreground mb-6">
          Mulai jelajahi resep dan simpan favorit Anda
        </p>
        <Button asChild>
          <Link href="/resep">Jelajahi Resep</Link>
        </Button>
      </div>
    );
  }

  return (
    <RecipeLayout>
      {favoriteFoods.map((recipe) => (
        <Card key={recipe.id} className="overflow-hidden h-full">
          <CardHeader className="p-0">
            <div className="relative h-[200px] w-full">
              <Link href={`/resep/${recipe.id}`}>
                <Image
                  src={recipe.image_url}
                  alt={recipe.name}
                  fill
                  className="object-cover"
                />
              </Link>
              <FavoriteButton
                className="absolute left-2 top-2"
                onClick={() => isLogin(recipe.id)}
              />
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <Link href={`/resep/${recipe.id}`}>
              <CardTitle className="text-lg line-clamp-1 hover:underline">
                {recipe.name}
              </CardTitle>
            </Link>
            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
              {recipe.description}
            </p>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <div className="text-sm text-muted-foreground flex gap-2 items-center justify-center">
              <Eye className="h-4 w-4" />
              {recipe.click_count || 0}
            </div>
            {recipe.province_name && (
              <div className="ml-auto text-sm bg-primary/10 text-primary px-2 py-1 rounded-full">
                {recipe.province_name}
              </div>
            )}
          </CardFooter>
        </Card>
      ))}
    </RecipeLayout>
  );
}
