"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import provinces from "@/data/provinces"
import { nanoid } from "nanoid"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

export function RecipeFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedProvince, setSelectedProvince] = useState(
    searchParams.get("province")
  )

  const handleProvinceChange = (value) => {
    setSelectedProvince(value)
  }

  const setUpProvince = provinces.map((prov, i) => {
    return {
      id: i + 1,
      title: prov.title,
    }
  })

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString())

    if (selectedProvince) {
      params.set("province", selectedProvince)
    } else {
      params.delete("province")
    }

    router.push(`/resep?${params.toString()}`)
  }

  const resetFilters = () => {
    setSelectedProvince(null)

    const params = new URLSearchParams(searchParams.toString())
    params.delete("province")

    router.push(`/resep?${params.toString()}`)
  }

  return (
    <Card className="bg-custom-cream/50 border-custom-beige">
      <CardHeader>
        <CardTitle className="text-custom-red-dark">Filter Provinsi</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="max-h-52 overflow-y-auto">
            <RadioGroup
              value={selectedProvince || ""}
              onValueChange={handleProvinceChange}
            >
              {setUpProvince.map((province) => (
                <div key={nanoid()} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={province.id.toString()}
                    id={`province-${province.id}`}
                  />
                  <Label htmlFor={`province-${province.id}`}>
                    {province.title}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={applyFilters}
            className="bg-custom-red hover:bg-custom-red-light flex-1"
          >
            Terapkan
          </Button>
          <Button
            variant="outline"
            onClick={resetFilters}
            className="border-custom-red text-custom-red hover:bg-custom-red/10 flex-1"
          >
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
