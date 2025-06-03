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
      </CardContent>
    </Card>
  );
}
