// Next.js automatically renders this file while /blog/[slug]/page.tsx is
// fetching data server-side. No extra JS — just a pure layout skeleton.

export default function BlogPostLoading() {
  return (
    <div className="container mx-auto px-5">
      {/* ── Header placeholder ── */}
      <div className="h-16 flex items-center mb-6">
        <div className="skeleton h-6 w-32 rounded" />
      </div>

      <div className="max-w-prose mx-auto text-xl">
        {/* ── Hero image ── */}
        <div className="skeleton w-full aspect-video rounded-lg mb-8" />

        {/* ── Title ── */}
        <div className="skeleton h-9 w-4/5 mb-3 rounded" />
        <div className="skeleton h-9 w-3/5 mb-8 rounded" />

        {/* ── Content lines ── */}
        {[100, 95, 90, 100, 88, 75, 100, 92, 60].map((w, i) => (
          <div
            key={i}
            className="skeleton h-4 mb-3 rounded"
            style={{ width: `${w}%` }}
          />
        ))}

        {/* ── Paragraph break ── */}
        <div className="mb-6" />

        {[100, 94, 88, 100, 70].map((w, i) => (
          <div
            key={`b${i}`}
            className="skeleton h-4 mb-3 rounded"
            style={{ width: `${w}%` }}
          />
        ))}

        {/* ── Tags row ── */}
        <div className="flex gap-2 mt-10">
          {[48, 56, 40].map((w, i) => (
            <div key={i} className="skeleton h-4 rounded" style={{ width: w }} />
          ))}
        </div>

        {/* ── Date ── */}
        <div className="skeleton h-3 w-24 mt-4 rounded" />
      </div>
    </div>
  );
}
