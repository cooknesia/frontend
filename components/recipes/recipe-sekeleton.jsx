import { nanoid } from "nanoid";
import { Skeleton } from "../ui/skeleton";

export default function RecipeListSkeleton({ count = 6 }) {
  return Array(count)
    .fill(0)
    .map(() => (
      <div key={nanoid()} className="space-y-3">
        <Skeleton className="h-[200px] w-full rounded-lg" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
      </div>
    ));
}
