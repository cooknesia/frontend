"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/auth-context";
import { getHistoryRecommendationByUserId } from "@/lib/api";
import { formatDistanceToNow } from "date-fns";
import { nanoid } from "nanoid";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function RecommendationHistory() {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const getHistory = async () => {
      if (!user) return;

      try {
        const data = await getHistoryRecommendationByUserId(user.id);
        setHistory(data);
      } catch (error) {
        console.error("Failed to fetch recommendation history:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getHistory();
  }, [user]);

  const handleRepeatRecommendation = (ingredients) => {
    const params = new URLSearchParams();
    params.set("ingredients", ingredients.join(","));
    router.push(`/recommendations?${params.toString()}`);
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        {Array(2)
          .fill(0)
          .map(() => (
            <Card key={nanoid()}>
              <CardHeader>
                <Skeleton className="h-6 w-1/3" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Array(3)
                    .fill(0)
                    .map(() => (
                      <Skeleton
                        key={nanoid()}
                        className="h-[150px] w-full rounded-lg"
                      />
                    ))}
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-2">
          No recommendation history yet
        </h3>
        <p className="text-muted-foreground mb-6">
          Get your first recommendation to see it here
        </p>
        <Button asChild>
          <Link href="/recommendations">Get Recommendations</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {history.map((item) => (
        <Card key={item.id}>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <CardTitle>
                Recommendation from{" "}
                {formatDistanceToNow(new Date(item.created_at), {
                  addSuffix: true,
                })}
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  handleRepeatRecommendation(item.selected_ingredients)
                }
              >
                Repeat
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Ingredients used:</h3>
              <div className="flex flex-wrap gap-2">
                {item.selected_ingredients.map((ingredient) => (
                  <Badge key={nanoid()} variant="secondary">
                    {ingredient}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Recommended recipes:</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {item.foods.map((recipe) => (
                  <Link href={`/resep/${recipe.id}`} key={recipe.id}>
                    <Card className="overflow-hidden h-full transition-transform hover:scale-[1.02]">
                      <div className="relative h-[150px] w-full">
                        <Image
                          src={recipe.image_url}
                          alt={recipe.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="p-3">
                        <h4 className="font-medium line-clamp-1">
                          {recipe.name}
                        </h4>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
