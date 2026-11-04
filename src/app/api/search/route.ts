import { wisp } from "@/lib/wisp";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("q")?.trim();

  if (!query || query.length < 2) {
    return NextResponse.json({ posts: [] });
  }

  const result = await wisp.getPosts({ query, limit: 5 });
  return NextResponse.json({ posts: result.posts });
}

