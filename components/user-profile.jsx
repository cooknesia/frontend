"use client"

import { FavoritesList } from "@/components/favorites-list"
import { RecommendationHistory } from "@/components/recommendation-history"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/context/auth-context"
import Link from "next/link"

export function UserProfile() {
  const { user, logout } = useAuth() 

  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src={user.photo_url}
                alt={user.name}
              />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>

            <div className="space-y-2 text-center md:text-left">
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-muted-foreground">{user.email}</p>
              <p className="text-sm text-muted-foreground">
                Anggota sejak {new Date(user.created_at).toLocaleDateString()}
              </p>

              <Button variant="outline" onClick={logout}>
                Keluar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="favorites" className="border-red-800">
        <TabsList className="mb-6">
          <TabsTrigger value="favorites">Favorit</TabsTrigger>
          <TabsTrigger value="recommendations">Riwayat Rekomendasi</TabsTrigger>
        </TabsList>

        <TabsContent value="favorites">
          <FavoritesList />
        </TabsContent>

        <TabsContent value="recommendations">
          <RecommendationHistory />
        </TabsContent>
      </Tabs>
    </div>
  )
}
