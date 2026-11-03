import { config } from "@/config";
import Link from "next/link";

// Mirrors the BlogPostPreview card structure exactly.
function PostCardSkeleton() {
  return (
    <div className="break-words">
      {/* Thumbnail */}
      <div className="skeleton aspect-[16/9] rounded-xl" />

      <div className="grid grid-cols-1 gap-3 mt-4">
        {/* Title — two lines to match long titles */}
        <div className="skeleton h-7 w-3/4 rounded-md" />

        {/* Date · read time row */}
        <div className="flex items-center gap-2">
          <div className="skeleton h-4 w-28 rounded" />
          <div className="skeleton h-4 w-4 rounded-full" />
          <div className="skeleton h-4 w-16 rounded" />
        </div>

        {/* Description lines */}
        <div className="space-y-2 pt-1">
          <div className="skeleton h-4 w-full rounded" />
          <div className="skeleton h-4 w-full rounded" />
          <div className="skeleton h-4 w-5/6 rounded" />
          <div className="skeleton h-4 w-2/3 rounded" />
        </div>

        {/* Tags */}
        <div className="flex gap-2 pt-1">
          <div className="skeleton h-4 w-12 rounded" />
          <div className="skeleton h-4 w-16 rounded" />
        </div>
      </div>
    </div>
  );
}

export default function HomeLoading() {
  return (
    <div className="container mx-auto px-5 mb-10">
      {/* Header — rendered normally so it never flashes */}
      <section className="flex items-center justify-between mt-8 md:mt-16 mb-12">
        <Link href="/">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight">
            {config.blog.name}
          </h1>
        </Link>
      </section>

      {/* Post grid skeleton — matches BlogPostsPreview layout */}
      <div className="grid grid-cols-1 gap-16 lg:gap-28 md:grid-cols-2 md:my-16 my-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <PostCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

