import { getAllPosts, getAllTags } from "@/lib/mdx"
import { BlogCard } from "@/components/blog/blog-card"
import { CtaBanner } from "@/components/blog/cta-banner"
import { BookOpen } from "lucide-react"

/**
 * Blog index page — lists all published posts with tag filtering.
 * Statically generated at build time via fs-based MDX reading.
 */
export default function BlogIndex() {
  const posts = getAllPosts()
  const tags = getAllTags()

  return (
    <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-accent/10 border border-accent/20 text-accent text-sm font-extrabold mb-5">
          <BookOpen className="w-4 h-4" />
          Insights & Resources
        </div>
        <h1 className="text-[clamp(2rem,4vw,3rem)] font-extrabold text-primary leading-tight mb-4">
          The Beacon Admit Blog
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
          Expert insights on AI-powered admissions, after-hours coverage, HIPAA
          compliance, and revenue recovery for behavioral health facilities.
        </p>
      </div>

      {/* Tag filter pills */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-bold text-muted-foreground bg-white/80 border border-border/60 px-3 py-1.5 rounded-lg cursor-default hover:border-accent/30 hover:text-accent transition-colors duration-200"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Post grid */}
      {posts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg">
            No posts published yet. Check back soon.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}

      {/* Inline CTA */}
      <CtaBanner />
    </div>
  )
}
