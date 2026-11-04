"use client";

import { GetPostsResult } from "@/lib/wisp";
import { formatDate } from "date-fns";
import { FileText, Loader2, Search, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Post = GetPostsResult["posts"][0];

export function SearchModal() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Cmd/Ctrl+K shortcut + Escape to close
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Focus input when modal opens; reset state on close
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
      setResults([]);
      setActiveIndex(-1);
    }
  }, [open]);

  // Debounced search
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query.trim())}`);
        const data = await res.json();
        setResults(data.posts ?? []);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);

  // Arrow key + Enter navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!results.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      router.push(`/blog/${results[activeIndex].slug}`);
      setOpen(false);
    }
  };

  return (
    <>
      {/* Trigger button */}
      <button
        aria-label="Search posts"
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors ml-4 md:ml-6"
      >
        <Search className="w-5 h-5" />
        <kbd className="hidden md:inline-flex items-center gap-0.5 rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
          ⌘K
        </kbd>
      </button>

      {open && (
        <>
          {/* Backdrop — clicking it closes the modal, NO scroll lock */}
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Modal panel */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Search posts"
            className="fixed left-1/2 top-[18%] z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 rounded-2xl border bg-background shadow-2xl overflow-hidden"
          >
            {/* Input row */}
            <div className="flex items-center gap-3 px-4 py-3 border-b">
              <Search className="w-4 h-4 text-muted-foreground shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => { setQuery(e.target.value); setActiveIndex(-1); }}
                onKeyDown={handleKeyDown}
                placeholder="Search posts…"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                autoComplete="off"
              />
              {loading
                ? <Loader2 className="w-4 h-4 text-muted-foreground animate-spin shrink-0" />
                : (
                  <button
                    onClick={() => setOpen(false)}
                    className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )
              }
            </div>

            {/* Results */}
            {results.length > 0 && (
              <ul className="py-2 max-h-80 overflow-y-auto">
                {results.map((post, i) => (
                  <li key={post.id}>
                    <Link
                      href={`/blog/${post.slug}`}
                      onClick={() => setOpen(false)}
                      className={`flex items-start gap-3 px-4 py-3 transition-colors ${i === activeIndex ? "bg-muted" : "hover:bg-muted/60"
                        }`}
                    >
                      <FileText className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-medium leading-snug truncate">{post.title}</p>
                        {post.description && (
                          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                            {post.description}
                          </p>
                        )}
                        <p className="text-[10px] text-muted-foreground/60 mt-1">
                          {formatDate(post.publishedAt || post.updatedAt, "dd MMM yyyy")}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            {/* Empty state */}
            {!loading && query.trim().length >= 2 && results.length === 0 && (
              <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                No posts found for &ldquo;{query}&rdquo;
              </div>
            )}

            {/* Idle hint */}
            {query.trim().length < 2 && (
              <div className="px-4 py-6 text-center text-xs text-muted-foreground">
                Type at least 2 characters to search
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
