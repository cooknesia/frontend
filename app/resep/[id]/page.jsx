import RecipeDetailContent from "@/components/recipe-detail/recipe-detail-content";
import { FoodsProvider } from "@/context/foods-context";
import { getFoodById } from "@/lib/api/api";

export default async function RecipePage({ params }) {
  const { id } = await params;

  if (!id) {
    return <div className="p-4">Recipe not found</div>;
  }

  const response = await getFoodById(id);
  return (
    <FoodsProvider>
      <RecipeDetailContent recipe={response.data} />
    </FoodsProvider>
  );
}
