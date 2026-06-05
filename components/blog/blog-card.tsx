import Link from "next/link"
import { Calendar, Tag, ArrowRight } from "lucide-react"
import type { PostMeta } from "@/lib/mdx"

interface BlogCardProps {
  post: PostMeta
}

/**
 * Blog post preview card for the blog index page.
 * Displays title, description, date, tags, and read-more link.
 */
export function BlogCard({ post }: BlogCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <article className="group glass-card rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-accent/30">
      {/* Tags */}
      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 text-xs font-bold text-accent bg-accent/10 px-2.5 py-1 rounded-md"
            >
              <Tag className="w-3 h-3" />
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Title */}
      <Link href={`/blog/${post.slug}`} className="block mb-3">
        <h2 className="text-xl font-extrabold text-primary leading-tight group-hover:text-accent transition-colors duration-200">
          {post.title}
        </h2>
      </Link>

      {/* Description */}
      <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
        {post.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-border/60">
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <Calendar className="w-4 h-4" />
          <time dateTime={post.date}>{formattedDate}</time>
        </div>
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-extrabold text-accent hover:text-primary transition-colors duration-200"
        >
          Read more
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </article>
  )
}
