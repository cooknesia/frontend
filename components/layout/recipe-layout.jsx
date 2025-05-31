import { cn } from "@/lib/utils";

export default function RecipeLayout({ children, className }) {
  return (
    <div className={cn("grid sm:grid-cols-2 lg:grid-cols-4 gap-3", className)}>
      {children}
    </div>
  );
}
