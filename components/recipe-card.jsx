"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import provinces from "@/data/provinces";
import { Eye, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function RecipeCard({ recipe }) {
  const province = provinces.find(
    (prov) => prov.id === recipe.province_id
  )?.title;
  return (
    <Link href={`/resep/${recipe.id}`}>
      <Card className="overflow-hidden h-full transition-transform hover:scale-[1.02] border-custom-cream hover:border-custom-beige">
        <CardHeader className="p-0">
          <div className="relative h-[200px] w-full">
            <Image
              src={recipe.image_url}
              alt={recipe.name}
              fill
              className="object-cover"
            />
            {recipe.province_id && (
              <div className="absolute top-2 right-2">
                <span className="bg-custom-red text-white text-xs px-2 py-1 rounded-full">
                  {province}
                </span>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="text-lg line-clamp-1">{recipe.name}</CardTitle>
          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
            {recipe.description}
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between">
          {recipe.average_rating !== undefined && (
            <div className="flex items-center text-sm">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              <span>{recipe.average_rating || "Belum ada penilaian"}</span>
            </div>
          )}
          <div className="text-sm text-muted-foreground flex gap-1 items-center justify-center">
            <Eye className="inline h-4 w-4" />
            {recipe.click_count || 0}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
