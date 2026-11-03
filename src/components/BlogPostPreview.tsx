"use client";
import { cn } from "@/lib/utils";
import { shimmerBlurDataURL } from "@/lib/imageUtils";
import { GetPostsResult } from "@/lib/wisp";
import { formatDate } from "date-fns";
import { Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent } from "react";

export const BlogPostPreview: FunctionComponent<{
  post: GetPostsResult["posts"][0];
  readTime?: string;
}> = ({ post, readTime }) => {
  return (
    <div className="break-words">
      <Link href={`/blog/${post.slug}`}>
        <div className="aspect-[16/9] relative rounded-xl overflow-hidden">
          <Image
            alt={post.title}
            className="object-cover transition-all duration-500 hover:scale-105"
            src={post.image || "/images/placeholder.webp"}
            fill
            placeholder="blur"
            blurDataURL={shimmerBlurDataURL}
          />
        </div>
      </Link>
      <div className="grid grid-cols-1 gap-3 md:col-span-2 mt-4">
        <h2 className="font-sans font-semibold tracking-tighter text-primary text-2xl md:text-3xl">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>
        <div className="prose lg:prose-lg italic tracking-tighter text-muted-foreground flex items-center gap-2 flex-wrap">
          <span>{formatDate(post.publishedAt || post.updatedAt, "dd MMMM yyyy")}</span>
          {readTime && (
            <>
              <span className="text-muted-foreground/40 select-none">·</span>
              <span className="flex items-center gap-1 not-italic font-medium text-sm text-muted-foreground">
                <Clock className="w-3.5 h-3.5 shrink-0" />
                {readTime}
              </span>
            </>
          )}
        </div>
        <Link href={`/blog/${post.slug}`} className="block cursor-pointer">
          <div className="prose lg:prose-lg leading-relaxed md:text-lg line-clamp-4 text-muted-foreground">
            {post.description}
          </div>
        </Link>
        <div className="text-sm text-muted-foreground">
          {post.tags.map((tag) => (
            <div key={tag.id} className="mr-2 inline-block">
              <Link href={`/tag/${tag.name}`}>#{tag.name}</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const BlogPostsPreview: FunctionComponent<{
  posts: GetPostsResult["posts"];
  readTimes?: Record<string, string>;
  className?: string;
}> = ({ posts, readTimes, className }) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-16 lg:gap-28 md:grid-cols-2 md:my-16 my-8",
        className
      )}
    >
      {posts.map((post) => (
        <BlogPostPreview
          key={post.id}
          post={post}
          readTime={readTimes?.[post.slug]}
        />
      ))}
    </div>
  );
};
