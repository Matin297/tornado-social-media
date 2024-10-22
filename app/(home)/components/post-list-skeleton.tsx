import { Skeleton } from "@/components/ui/skeleton";

export default function PostListSkeleton() {
  return (
    <div className="space-y-6">
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="space-y-2 p-6">
            <div key={i} className="flex items-center space-x-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[250px]" />
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4" />
              <Skeleton className="h-4" />
              <Skeleton className="h-4" />
              <Skeleton className="h-4" />
            </div>
          </div>
        ))}
    </div>
  );
}
