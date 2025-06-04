"use client";

import CardSection from "@/components/card-section";
import RecipeLayout from "@/components/layout/recipe-layout";
import { RecipeCard } from "@/components/recipe-card";
import IngredientMultiSelect from "@/components/rekomendasi/ingredient-multi-select";
import RecommendationHistoryTab from "@/components/rekomendasi/recommendation-history-tab";
import RecommendationSkeleton from "@/components/rekomendasi/recommendation-skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/auth-context";
import { getRecomendationFoods } from "@/lib/api/api";
import { formatDate } from "@/lib/utils";
import { useFoodsStore } from "@/store/use-foods";
import { ChefHat, Loader2, Search } from "lucide-react";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

export default function RecommendationPage() {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [isLoadingRecommendations, setIsLoadingRecommendations] =
    useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [activeTab, setActiveTab] = useState("rekomendasi");
  const [activeHistory, setActiveHistory] = useState(null);
  const {
    fetchHistoryIngredients,
    historyIngredients,
    loadHistoryIngredients,
  } = useFoodsStore();

  const { user, token } = useAuth();

  useEffect(() => {
    if (!user || !token) return;
    fetchHistoryIngredients(user.id, token);
    // BUKAN DISINI
  }, [user, token]);

  const handleGetRecommendations = async () => {
    if (selectedIngredients.length === 0) return;

    setIsLoadingRecommendations(true);
    setHasSearched(true);

    try {
      const normalizedIngredients = selectedIngredients.map((v) => v.name);
      const response = await getRecomendationFoods(
        normalizedIngredients,
        user?.id || ""
      );
      setRecommendations(response.data || []);
    } catch (error) {
      console.error("Rekomendasi pengambilan kesalahan:", error);
      setRecommendations([]);
    } finally {
      if (token) fetchHistoryIngredients(user.id, token);
      setIsLoadingRecommendations(false);
    }
  };

  const handleReuseSearch = (ingredients) => {
    const ingredientObjects = ingredients.map((name, index) => ({
      id: Date.now() + index,
      name: name,
    }));

    setSelectedIngredients(ingredientObjects);
    setActiveTab("rekomendasi");

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleActiveHistory = (recipe) => {
    setActiveHistory(recipe);
  };

  const renderContent = () => {
    if (!hasSearched && recommendations.length === 0) {
      return (
        <CardSection
          icon={<ChefHat className="h-16 w-16 text-gray-400 mb-4" />}
          title="Pilih Bahan Makanan"
          description="Pilih satu atau beberapa bahan makanan yang tersedia di dapur Anda, lalu kami akan merekomendasikan resep yang bisa dibuat."
        />
      );
    }

    if (isLoadingRecommendations) {
      return <RecommendationSkeleton />;
    }

    if (hasSearched && recommendations.length === 0) {
      return (
        <Card className="border-dashed border-2 border-gray-300">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Search className="h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Tidak Ada Resep Ditemukan
            </h3>
            <p className="text-gray-500 text-center max-w-md">
              Maaf, tidak ditemukan resep yang cocok dengan bahan yang Anda
              pilih. Coba pilih bahan lain atau kombinasi bahan yang berbeda.
            </p>
          </CardContent>
        </Card>
      );
    }

    return (
      <div>
        <RecipeLayout>
          {recommendations.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </RecipeLayout>
      </div>
    );
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Rekomendasi Resep</h1>
        <p className="text-gray-600">
          Temukan resep yang bisa dibuat dengan bahan yang Anda miliki
        </p>
      </div>

      <div className="grid md:grid-cols-[250px_1fr] gap-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="rekomendasi">Rekomendasi</TabsTrigger>
            <TabsTrigger value="riwayat">Riwayat</TabsTrigger>
          </TabsList>

          <div className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            <Card className={`mb-8 ${activeTab === "riwayat" && "hidden"}`}>
              <CardContent className="p-3">
                <div className="space-y-4 flex gap-2 items-center justify-center">
                  <IngredientMultiSelect
                    selectedIngredients={selectedIngredients}
                    onSelectionChange={setSelectedIngredients}
                    button={
                      <Button
                        onClick={handleGetRecommendations}
                        disabled={
                          selectedIngredients.length === 0 ||
                          isLoadingRecommendations
                        }
                        className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600"
                      >
                        {isLoadingRecommendations ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Search className="h-4 w-4" />
                        )}
                      </Button>
                    }
                  />
                </div>
              </CardContent>
            </Card>
            <Card className={`mb-8 ${activeTab === "rekomendasi" && "hidden"}`}>
              <CardContent className="p-2 flex gap-2 flex-col">
                {!loadHistoryIngredients ? (
                  historyIngredients.map((item) => (
                    <div
                      key={item.id}
                      className={`border rounded-md p-2 cursor-pointer hover:bg-gray-50 transition-colors ${
                        activeHistory?.id === item.id && "bg-gray-100"
                      }`}
                      onClick={() => handleActiveHistory(item)}
                    >
                      <div className="flex gap-1 flex-wrap">
                        {item.selected_ingredients.map((v) => (
                          <Badge className="line-clamp-1" key={nanoid()}>
                            {v}
                          </Badge>
                        ))}
                      </div>
                      <h1 className="text-sm">
                        {formatDate(item.created_at).relative}
                      </h1>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col gap-1">
                    {Array(8)
                      .fill(0)
                      .map(() => (
                        <Skeleton key={nanoid()} className="h-10 w-full" />
                      ))}
                  </div>
                )}
                {}
              </CardContent>
            </Card>
          </div>
        </Tabs>
        {activeTab === "rekomendasi" ? (
          renderContent()
        ) : (
          <RecommendationHistoryTab
            history={historyIngredients}
            isLoading={loadHistoryIngredients}
            onReuseSearch={handleReuseSearch}
            activeHistory={activeHistory}
          />
        )}
      </div>
    </div>
  );
}
