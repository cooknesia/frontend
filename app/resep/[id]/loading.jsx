import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function RecipeDetailSkeleton() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="overflow-hidden border-none shadow-lg">
        <div className="flex flex-col md:flex-row">
          {/* Left side - Image Skeleton */}
          <div className="w-full md:w-2/5 aspect-square">
            <Skeleton className="w-full h-full cursor-pointer hover:opacity-80 transition-opacity" />
          </div>

          {/* Right side - Content Skeleton */}
          <div className="w-full md:w-3/5">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <Skeleton className="h-8 w-3/4" />
                <div className="flex gap-2">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <Skeleton className="h-10 w-10 rounded-full" />
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-4 w-16" />
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-28" />
              </div>

              <div className="space-y-2 mb-6">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>

              <Skeleton className="h-10 w-32 mb-6" />

              {/* Tabs Skeleton */}
              <div className="mt-4">
                <div className="grid w-full grid-cols-2 gap-2 mb-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <Skeleton className="h-6 w-40 mb-4" />
                  <div className="space-y-3">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                      <div key={item} className="flex items-start">
                        <Skeleton className="w-6 h-6 rounded-full mr-3 mt-0.5 flex-shrink-0" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  )
}
