"use client";
import { useAuth } from "@/context/auth-context";
import { useToast } from "@/hooks/use-toast";
import { getRatingFood } from "@/lib/api/api";
import { useFoodsStore } from "@/store/use-foods";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import FavoriteButton from "./favorite-button";
import ImagePreviewDialog from "./image-preview-dialog";
import RatingDialog from "./rating-dialog";
import ShareButtons from "./share-buttons";

export default function RecipeDetailContent({ recipe }) {
  const hashtags = recipe.description.match(/#\w+/g) || [];
  const cleanDescription = recipe.description.replace(/#\w+/g, "").trim();
  const [userHasRated, setUserHasRated] = useState(false);
  const { user, token } = useAuth();
  const { handleFavorite, openRatingDialog, isRatingDialogOpen, rating } =
    useFoodsStore();
  const { toast } = useToast();

  useEffect(() => {
    const fetchRate = async () => {
      const response = await getRatingFood(recipe.id, token);
      setUserHasRated(response.user_has_rated);
    };
    if (token) fetchRate();
  }, [rating, token]);

  const handleDialog = async () => {
    if (!user) {
      toast({
        title: "Anda perlu masuk",
        description: "Silakan masuk untuk memberikan rating.",
        variant: "warning",
      });
      return;
    }

    if (userHasRated) {
      toast({
        title: "Upsss...",
        description: "Anda telah memberikan rating sebelumnya.",
        variant: "warning",
      });
      return;
    }

    openRatingDialog();
  };

  const isLogin = () => {
    if (user) {
      handleFavorite(user.id, token, recipe.id);
    } else {
      toast({
        title: "Anda perlu masuk",
        description: "Silakan masuk untuk menambahkan ke favorite.",
        variant: "warning",
      });
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="overflow-hidden border-none shadow-lg">
        <div className="flex flex-col md:flex-row">
          <div className="relative w-full md:w-2/5 aspect-square h-fit overflow-hidden rounded-lg">
            <ImagePreviewDialog
              src={recipe.image_url}
              alt={recipe.name}
              title={recipe.name}
              className="aspect-square w-2/5 object-contain"
            />
          </div>

          <div className="w-full md:w-3/5">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                  {recipe.name}
                </h1>
                <div className="flex gap-2">
                  <ShareButtons recipeName={recipe.name} />
                  <FavoriteButton onClick={isLogin} />
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1">
                    {recipe.average_rating.toFixed(1)}
                  </span>
                </div>
                <span className="text-sm">•</span>
                <span className="text-sm flex gap-1 items-center justify-center">
                  {recipe.click_count} Dilihat
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {hashtags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-orange-100 text-orange-800 hover:bg-orange-200"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              <p className="text-gray-700 mb-6">{cleanDescription}</p>

              <div className="mb-6">
                <Button
                  variant="outline"
                  className="flex items-center gap-2 bg-orange-50 text-orange-800 border-orange-200 hover:bg-orange-100"
                  onClick={handleDialog}
                >
                  <Star className="h-5 w-5" />
                  {userHasRated
                    ? "Anda telah memberikan rating"
                    : "Berikan Rating"}
                </Button>
                <RatingDialog
                  open={isRatingDialogOpen}
                  onOpenChange={handleDialog}
                />
              </div>

              <Tabs defaultValue="ingredients" className="mt-4">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="ingredients">Bahan-bahan</TabsTrigger>
                  <TabsTrigger value="steps">Langkah Memasak</TabsTrigger>
                </TabsList>

                <TabsContent value="ingredients" className="mt-4">
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <h2 className="text-xl font-bold mb-4 flex items-center">
                      <span className="bg-orange-100 text-orange-800 p-1 rounded-md mr-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-5 h-5"
                        >
                          <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
                          <path d="M7 2v20" />
                          <path d="M21 15V2" />
                          <path d="M18 15a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
                        </svg>
                      </span>
                      Bahan-bahan
                    </h2>
                    <ul className="space-y-2">
                      {recipe.ingredients.map((ingredient, index) => (
                        <li key={index} className="flex items-start">
                          <span className="bg-orange-100 text-orange-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            {index + 1}
                          </span>
                          <span>{ingredient}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="steps" className="mt-4">
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <h2 className="text-xl font-bold mb-6 flex items-center">
                      <span className="bg-orange-100 text-orange-800 p-1 rounded-md mr-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-5 h-5"
                        >
                          <path d="M8 3v3a2 2 0 0 1-2 2H3" />
                          <path d="M21 8h-3a2 2 0 0 1-2-2V3" />
                          <path d="M3 16h3a2 2 0 0 1 2 2v3" />
                          <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
                        </svg>
                      </span>
                      Langkah-langkah Memasak
                    </h2>
                    <div className="space-y-6">
                      {recipe.cooking_steps.map((step) => (
                        <div key={step.step_order} className="flex">
                          <div className="mr-4 flex-shrink-0">
                            <div className="bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                              {step.step_order}
                            </div>
                          </div>
                          <div className="bg-white p-4 rounded-lg flex-grow">
                            <p>{step.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  );
}
