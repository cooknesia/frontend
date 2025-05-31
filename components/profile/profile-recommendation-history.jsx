"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { format, formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import { Clock, Eye, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { formatDate } from "@/lib/utils";

export default function ProfileRecommendationHistory({ history, isLoading }) { 

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
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (history.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Riwayat Rekomendasi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-gray-500">
            <Clock className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">
              Belum ada riwayat rekomendasi
            </h3>
            <p className="text-sm">
              Mulai cari rekomendasi untuk melihat riwayat di sini
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
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
                      <span className="text-sm text-gray-500">
                        {item.foods.length} resep
                      </span>
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
        </Accordion>
      </CardContent>
    </Card>
  );
}
