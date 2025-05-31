"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useAuth } from "@/context/auth-context"
import { useToast } from "@/hooks/use-toast"
import { getAllIngredients, getFoodRecommendations, searchIngredientsByKeyword } from "@/lib/api"
import { Plus, Search, X } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export function RecommendationForm() {
  const [availableIngredients, setAvailableIngredients] = useState ([])
  const [selectedIngredients, setSelectedIngredients] = useState ([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [open, setOpen] = useState(false)
  const { user } = useAuth()
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const getIngredients = async () => {
      setIsLoading(true)
      try {
        const response = await getAllIngredients(1)
        setAvailableIngredients(response.ingredients)
      } catch (error) {
        console.error("Failed to fetch ingredients:", error)
      } finally {
        setIsLoading(false)
      }
    }

    getIngredients()
  }, [])

  useEffect(() => {
    const ingredientIds = searchParams.get("ingredients")
    if (ingredientIds && availableIngredients.length > 0) {
      const ids = ingredientIds.split(",").map((id) => Number.parseInt(id))
      const ingredients = availableIngredients.filter((ing) => ids.includes(ing.id))
      setSelectedIngredients(ingredients)
    }
  }, [searchParams, availableIngredients])

  const handleSearch = async (value) => {
    setSearchQuery(value)

    if (value.trim().length > 2) {
      try {
        const results = await searchIngredientsByKeyword(value)
        setAvailableIngredients(results)
      } catch (error) {
        console.error("Failed to search ingredients:", error)
      }
    } else if (value.trim().length === 0) {
      try {
        const response = await getAllIngredients(1)
        setAvailableIngredients(response.ingredients)
      } catch (error) {
        console.error("Failed to fetch ingredients:", error)
      }
    }
  }

  const handleAddIngredient = (ingredient ) => {
    if (!selectedIngredients.some((ing) => ing.id === ingredient.id)) {
      setSelectedIngredients([...selectedIngredients, ingredient])
      setOpen(false)
    }
  }

  const handleRemoveIngredient = (ingredientId ) => {
    setSelectedIngredients(selectedIngredients.filter((ing) => ing.id !== ingredientId))
  }

  const handleGetRecommendations = async () => {
    if (!user) {
      toast({
        title: "Autentikasi diperlukan",
        description: "Silakan login untuk mendapatkan rekomendasi",
        variant: "destructive",
      })
      return
    }

    if (selectedIngredients.length === 0) {
      toast({
        title: "Tidak ada bahan yang dipilih",
        description: "Silakan pilih setidaknya satu bahan",
        variant: "destructive",
      })
      return
    }

    try {
      const ingredientIds = selectedIngredients.map((ing) => ing.id)
      await getFoodRecommendations(user.id, ingredientIds)

      const params = new URLSearchParams()
      params.set("ingredients", ingredientIds.join(","))
      router.push(`/recommendations?${params.toString()}`)

      toast({
        title: "Rekomendasi siap",
        description: "Lihat resep yang cocok dengan bahan-bahan Anda",
      })
    } catch (error) {
      console.error("Failed to get recommendations:", error)
      toast({
        title: "Error",
        description: "Gagal mendapatkan rekomendasi. Silakan coba lagi.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="bg-custom-cream/50">
      <CardHeader>
        <CardTitle className="text-custom-red-dark">Pilih Bahan-bahan Anda</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    <span>{searchQuery || "Cari bahan..."}</span>
                    <Search className="h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="start">
                  <Command>
                    <CommandInput placeholder="Cari bahan..." value={searchQuery} onValueChange={handleSearch} />
                    <CommandList>
                      <CommandEmpty>Tidak ada bahan yang ditemukan.</CommandEmpty>
                      <CommandGroup>
                        {availableIngredients.map((ingredient) => (
                          <CommandItem
                            key={ingredient.id}
                            onSelect={() => handleAddIngredient(ingredient)}
                            disabled={selectedIngredients.some((ing) => ing.id === ingredient.id)}
                          >
                            <span>{ingredient.name}</span>
                            <Plus className="ml-auto h-4 w-4" />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex flex-wrap gap-2 min-h-[100px] p-4 border rounded-md bg-white">
              {selectedIngredients.length === 0 ? (
                <p className="text-muted-foreground w-full text-center my-auto">
                  Bahan yang dipilih akan muncul di sini
                </p>
              ) : (
                selectedIngredients.map((ingredient) => (
                  <Badge key={ingredient.id} variant="secondary" className="gap-1 bg-custom-beige text-foreground">
                    {ingredient.name}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 p-0 hover:bg-transparent"
                      onClick={() => handleRemoveIngredient(ingredient.id)}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Hapus</span>
                    </Button>
                  </Badge>
                ))
              )}
            </div>
          </div>
        </div>

        <Button
          onClick={handleGetRecommendations}
          disabled={selectedIngredients.length === 0}
          className="w-full bg-custom-red hover:bg-custom-red-light"
        >
          Dapatkan Rekomendasi
        </Button>
      </CardContent>
    </Card>
  )
}
