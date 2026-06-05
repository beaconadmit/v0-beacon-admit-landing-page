import fs from "fs"
import path from "path"
import matter from "gray-matter"

const CONTENT_DIR = path.join(process.cwd(), "content", "blog")

/** Frontmatter schema for blog posts */
export interface PostMeta {
  title: string
  description: string
  date: string
  slug: string
  tags: string[]
  author: string
  image?: string
  published: boolean
}

export interface Post {
  meta: PostMeta
  content: string
}

/**
 * Reads and parses a single MDX file by slug.
 * @returns Post with parsed frontmatter and raw markdown content.
 */
export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) {
    return null
  }

  const raw = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(raw)

  return {
    meta: {
      title: data.title ?? "",
      description: data.description ?? "",
      date: data.date ?? new Date().toISOString(),
      slug,
      tags: data.tags ?? [],
      author: data.author ?? "Beacon Admit",
      image: data.image,
      published: data.published !== false,
    },
    content,
  }
}

/**
 * Returns all published blog post metadata, sorted newest-first.
 */
export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(CONTENT_DIR)) {
    return []
  }

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"))

  const posts = files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "")
      const post = getPostBySlug(slug)
      return post?.meta ?? null
    })
    .filter((meta): meta is PostMeta => meta !== null && meta.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return posts
}

/**
 * Returns all unique tags across published posts.
 */
export function getAllTags(): string[] {
  const posts = getAllPosts()
  const tagSet = new Set<string>()
  for (const post of posts) {
    for (const tag of post.tags) {
      tagSet.add(tag)
    }
  }
  return Array.from(tagSet).sort()
}

/**
 * Returns all published post slugs for static generation.
 */
export function getAllPostSlugs(): string[] {
  return getAllPosts().map((p) => p.slug)
}
