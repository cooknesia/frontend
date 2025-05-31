"use client";

import { FavoritesList } from "@/components/favorites-list";
import { ProtectedRoute } from "@/components/protected-route";
import { Skeleton } from "@/components/ui/skeleton";
import { FoodsProvider } from "@/context/foods-context";
import { nanoid } from "nanoid";
import { Suspense } from "react";

export default function FavoritesPage() {
  return (
    <FoodsProvider>
      <ProtectedRoute>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Resep Favorit Anda</h1>

          <Suspense fallback={<FavoritesListSkeleton />}>
            <FavoritesList />
          </Suspense>
        </div>
      </ProtectedRoute>
    </FoodsProvider>
  );
}

function FavoritesListSkeleton() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array(6)
        .fill(0)
        .map(() => (
          <div key={nanoid()} className="space-y-3">
            <Skeleton className="h-[200px] w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-full" />
          </div>
        ))}
    </div>
  );
}
