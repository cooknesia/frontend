import RecipeLayout from "../layout/recipe-layout";
import RecipeListSkeleton from "../recipes/recipe-sekeleton";

export default function RecommendationSkeleton() {
  return (
    <RecipeLayout>
      <RecipeListSkeleton count={6} />
    </RecipeLayout>
  );
}
