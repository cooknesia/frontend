import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import RecipeLayout from "../layout/recipe-layout";
import RecipeListSkeleton from "../recipes/recipe-sekeleton";

export default function ProfileSkeleton() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <Card className="mb-2">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <Skeleton className="w-24 h-24 rounded-full" />

            <div className="flex-1 text-center sm:text-left">
              <Skeleton className="h-8 w-48 mb-2 mx-auto sm:mx-0" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-64 mx-auto sm:mx-0" />
                <Skeleton className="h-4 w-56 mx-auto sm:mx-0" />
              </div>
            </div>

            <Skeleton className="h-10 w-24" />
          </div>
        </CardHeader>
      </Card>

      <div>
        <div className="grid w-full grid-cols-2 gap-2 mb-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>

        <Card>
          <CardContent className="p-2">
            <RecipeLayout>
              <RecipeListSkeleton count={6} />
            </RecipeLayout>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
