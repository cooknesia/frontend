"use client";

import { cn } from "@/lib/utils";
import { Heart, Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { Button } from "../ui/button";
import { useFoodsStore } from "@/store/use-foods";

export default function FavoriteButton({ className, onClick }) {
  const params = useParams();
  const { favoriteFoods, handleFavorite, loading } = useFoodsStore();
  const isFavorite = Array.isArray(favoriteFoods)
    ? favoriteFoods.some((food) => food.id == params.id)
    : false;

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        `rounded-full ${isFavorite ? "bg-red-50 text-red-500 border-red-200" : "text-gray-400"}`,
        className
      )}
      onClick={onClick}
      aria-label={isFavorite ? "Hapus dari favorit" : "Tambahkan ke favorit"}
    >
      {loading ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500" : ""}`} />
      )}
    </Button>
  );
}
