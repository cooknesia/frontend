"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { getAllIngredients, searchIngredientsByKeyword } from "@/lib/api"
import { nanoid } from "nanoid"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"

export function IngredientsList() {
  const [ingredients, setIngredients] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const searchParams = useSearchParams()

  const keyword = searchParams.get("keyword")

  useEffect(() => {
    const getIngredients = async () => {
      setIsLoading(true)
      try {
        if (keyword) {
          const data = await searchIngredientsByKeyword(keyword)
          setIngredients(data)
          setTotalPages(1) 
        } else {
          const response = await getAllIngredients(page)
          setIngredients(response.ingredients)
          setTotalPages(Math.ceil(response.count / 20))  
        }
      } catch (error) {
        console.error("Failed to fetch ingredients:", error)
      } finally {
        setIsLoading(false)
      }
    }

    getIngredients()
  }, [page, keyword])

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1)
      window.scrollTo(0, 0)
    }
  }

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1)
      window.scrollTo(0, 0)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array(12)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={nanoid()} className="h-12 w-full" />
            ))}
        </div>
      </div>
    )
  }

  if (ingredients.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-2">No ingredients found</h3>
        <p className="text-muted-foreground mb-6">Try adjusting your search</p>
        <Button asChild>
          <Link href="/ingredients">View All Ingredients</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {ingredients.map(ingredient => (
          <Card key={ingredient.id}>
            <CardContent className="p-4">
              <Link
                href={`/recommendations?ingredients=${ingredient.id}`}
                className="block hover:text-primary transition-colors"
              >
                {ingredient.name}
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {!keyword && (
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevPage}
            disabled={page === 1}
          >
            Previous
          </Button>
          <div className="flex items-center gap-1">
            <span className="text-sm">
              Page {page} of {totalPages}
            </span>
          </div>
          <Button
            variant="outline"
            onClick={handleNextPage}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}
