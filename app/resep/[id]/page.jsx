import RecipeDetailContent from "@/components/recipe-detail/recipe-detail-content";
import { getFoodById } from "@/lib/api/api";
import { cookies } from "next/headers";

export default async function RecipePage({ params }) {
  const { id } = await params;

  if (!id) {
    return <div className="p-4">Recipe not found</div>;
  }

  const response = await getFoodById(id);
  return <RecipeDetailContent recipe={response.data} />;
}
