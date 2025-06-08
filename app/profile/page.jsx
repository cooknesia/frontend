"use client";

import ProfileFavorites from "@/components/profile/profile-favorites";
import ProfileRecommendationHistory from "@/components/profile/profile-recommendation-history";
import ProfileSkeleton from "@/components/profile/profile-skeleton";
import { ProtectedRoute } from "@/components/protected-route";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/auth-context";
import { useFoodsStore } from "@/store/use-foods";
import { Calendar, LogOut, Mail, User } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

export default function ProfilePage() {
  const {
    loading,
    favoriteFoods,
    fetchFavorites,
    fetchHistoryIngredients,
    historyIngredients,
    loadHistoryIngredients,
  } = useFoodsStore();
  const { user, loading: userLoading, token, logout } = useAuth();

  useEffect(() => {
    if (!user) return;
    fetchFavorites(user.id, token);
    fetchHistoryIngredients(user.id, token);
  }, [user, token, fetchFavorites]);

  const formatJoinDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "Tanggal tidak diketahui";
    }
  };

  if (userLoading) {
    return <ProfileSkeleton />;
  }

  if (!userLoading && !user) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <User className="h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Profil Tidak Ditemukan
            </h3>
            <p className="text-gray-500 text-center">
              Terjadi kesalahan saat memuat profil pengguna.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <Card className="mb-2">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <Avatar className="w-24 h-24">
                <Image
                  src={user.photo_url}
                  alt={user.name}
                  fill
                  className="h-24 w-24"
                  priority
                />
              </Avatar>

              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-2xl font-bold mb-2">{user.name}</h1>
                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <Mail className="h-4 w-4" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>
                      Bergabung sejak {formatJoinDate(user.created_at)}
                    </span>
                  </div>
                </div>
              </div>

              <Button
                variant="outline"
                onClick={logout}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Keluar
              </Button>
            </div>
          </CardHeader>
        </Card>

        <Tabs defaultValue="favorites" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="favorites">Resep Favorit</TabsTrigger>
            <TabsTrigger value="history">Riwayat Rekomendasi</TabsTrigger>
          </TabsList>

          <TabsContent value="favorites">
            <ProfileFavorites favorites={favoriteFoods} isLoading={loading} />
          </TabsContent>

          <TabsContent value="history">
            <ProfileRecommendationHistory
              history={historyIngredients}
              isLoading={loadHistoryIngredients}
            />
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedRoute>
  );
}
