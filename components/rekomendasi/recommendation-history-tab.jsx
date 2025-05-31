"use client";

import { useAuth } from "@/context/auth-context";
import { Clock, Lock, RotateCcw } from "lucide-react";
import { nanoid } from "nanoid";
import CardSection from "../card-section";
import RecipeLayout from "../layout/recipe-layout";
import { RecipeCard } from "../recipe-card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function RecommendationHistoryTab({
  history,
  isLoading,
  onReuseSearch,
  activeHistory,
}) {
  const { user, token } = useAuth();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Riwayat Rekomendasi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-4 w-32 mb-2" />
                <Skeleton className="h-8 w-24" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!user || !token) {
    return (
      <CardSection
        icon={<Lock className="h-16 w-16 mx-auto mb-4 opacity-50" />}
        title="Belum login"
        description="Login terlebih dahulu untuk melihat riwayat rekomendasi di sini"
      />
    );
  }

  if (history.length === 0) {
    return (
      <CardSection
        icon={<Clock className="h-16 w-16 mx-auto mb-4 opacity-50" />}
        title="Belum ada riwayat rekomendasi"
        description="Mulai cari rekomendasi untuk melihat riwayat di sini"
      />
    );
  }

  if (!activeHistory) {
    return (
      <CardSection
        icon={<Clock className="h-16 w-16 mx-auto mb-4 opacity-50" />}
        title="Pilih riwayat rekomendasi"
        description="Klik pada salah satu riwayat untuk melihat detailnya"
      />
    );
  }

  return (
    <Card className="border-dashed border-2 border-gray-300 h-fit">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            {activeHistory.selected_ingredients.map((v) => (
              <Badge
                key={nanoid()}
                variant="secondary"
                className="bg-orange-100 text-orange-800"
              >
                {v}
              </Badge>
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onReuseSearch(activeHistory.selected_ingredients);
            }}
            className="text-orange-600 border-orange-200 hover:bg-orange-50"
          >
            <RotateCcw className="h-4 w-4 mr-1" />
            Gunakan Lagi
          </Button>
        </div>
        <RecipeLayout>
          {activeHistory.foods.map((v) => (
            <RecipeCard key={nanoid()} recipe={v} className="mb-4" />
          ))}
        </RecipeLayout>
        {/* <Accordion type="single" collapsible className="w-full">
          {history.map((item) => {
            const dateInfo = formatDate(item.created_at);

            return (
              <AccordionItem key={item.id} value={`item-${item.id}`}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex flex-col items-start w-full pr-4">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {item.selected_ingredients.map((ingredient, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-orange-100 text-orange-800"
                        >
                          {ingredient}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between w-full">
                      <div className="text-left">
                        <p className="text-sm text-gray-600">
                          {dateInfo.absolute}
                        </p>
                        <p className="text-xs text-gray-500">
                          {dateInfo.relative}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">
                          {item.foods.length} resep
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            onReuseSearch(item.selected_ingredients);
                          }}
                          className="text-orange-600 border-orange-200 hover:bg-orange-50"
                        >
                          <RotateCcw className="h-4 w-4 mr-1" />
                          Gunakan Lagi
                        </Button>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {item.foods.map((recipe) => (
                        <Link key={recipe.id} href={`/recipe/${recipe.id}`}>
                          <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                            <div className="relative aspect-square">
                              <Image
                                src={recipe.image_url}
                                alt={recipe.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <CardContent className="p-3">
                              <h4 className="font-medium text-sm mb-1 line-clamp-2">
                                {recipe.name}
                              </h4>
                              <p className="text-gray-600 text-xs mb-2 line-clamp-2">
                                {recipe.description}
                              </p>

                              {(recipe.average_rating ||
                                recipe.click_count) && (
                                <div className="flex items-center justify-between text-xs text-gray-500">
                                  {recipe.average_rating && (
                                    <div className="flex items-center">
                                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                                      <span>
                                        {recipe.average_rating.toFixed(1)}
                                      </span>
                                    </div>
                                  )}
                                  {recipe.click_count && (
                                    <div className="flex items-center">
                                      <Eye className="h-3 w-3 mr-1" />
                                      <span>{recipe.click_count}</span>
                                    </div>
                                  )}
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion> */}
      </CardContent>
    </Card>
  );
}
