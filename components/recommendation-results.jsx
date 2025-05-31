"use client"

import { RecipeCard } from "@/components/recipe-card"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useAuth } from "@/context/auth-context"
import { getFoodRecommendations } from "@/lib/api"
import { nanoid } from "nanoid"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export function RecommendationResults() {
  const [recipes, setRecipes] = useState ([])
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuth()
  const searchParams = useSearchParams()

  const ingredientIds = searchParams.get("ingredients")

  useEffect(() => {
    const getRecommendations = async () => {
      if (!user || !ingredientIds) return

      setIsLoading(true)
      try {
        const ids = ingredientIds.split(",").map((id) => Number.parseInt(id))
        const data = await getFoodRecommendations(user.id, ids)
        setRecipes(data)
      } catch (error) {
        console.error("Failed to fetch recommendations:", error)
      } finally {
        setIsLoading(false)
      }
    }

    getRecommendations()
  }, [user, ingredientIds])

  if (!ingredientIds) {
    return null
  }

  if (isLoading) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">Resep yang Direkomendasikan</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(3)
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
      </div>
    )
  }

  if (recipes.length === 0 && ingredientIds) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">Resep yang Direkomendasikan</h2>
        <Card>
          <CardContent className="p-6 text-center">
            <p className="mb-2">Tidak ada resep yang ditemukan dengan bahan-bahan ini</p>
            <p className="text-sm text-muted-foreground">Coba pilih bahan yang berbeda</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Resep yang Direkomendasikan</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  )
}
