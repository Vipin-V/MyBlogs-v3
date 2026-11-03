import { BlogPostsPreview } from "@/components/BlogPostPreview";
import { BlogPostsPagination } from "@/components/BlogPostsPagination";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getReadTime } from "@/lib/readTime";
import { wisp } from "@/lib/wisp";

const Page = async (
  props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  }
) => {
  const searchParams = await props.searchParams;
  const page = searchParams.page ? parseInt(searchParams.page as string) : 1;
  const result = await wisp.getPosts({ limit: 6, page });

  // Fetch full content for all posts in parallel to compute accurate read times.
  // Next.js caches these fetch calls, so subsequent requests are free.
  const fullPosts = await Promise.all(
    result.posts.map((p) => wisp.getPost(p.slug))
  );
  const readTimes: Record<string, string> = {};
  fullPosts.forEach((r, i) => {
    if (r?.post?.content) {
      readTimes[result.posts[i].slug] = getReadTime(r.post.content);
    }
  });

  return (
    <div className="container mx-auto px-5 mb-10">
      <Header />
      <BlogPostsPreview posts={result.posts} readTimes={readTimes} />
      <BlogPostsPagination pagination={result.pagination} />
      <Footer />
    </div>
  );
};

export default Page;
