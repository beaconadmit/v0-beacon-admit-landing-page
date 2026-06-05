import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { ArrowLeft, Calendar, User, Tag } from "lucide-react"
import { getPostBySlug, getAllPostSlugs } from "@/lib/mdx"
import { CtaBanner } from "@/components/blog/cta-banner"

interface PageProps {
  params: Promise<{ slug: string }>
}

/**
 * Generates static params for all published blog posts.
 */
export async function generateStaticParams() {
  const slugs = getAllPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

/**
 * Generates SEO metadata per-post with Article JSON-LD.
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return { title: "Post Not Found" }

  return {
    title: `${post.meta.title} | Beacon Admit Blog`,
    description: post.meta.description,
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      url: `https://beaconadmit.com/blog/${slug}`,
      type: "article",
      publishedTime: post.meta.date,
      authors: [post.meta.author],
      siteName: "Beacon Admit",
    },
    twitter: {
      card: "summary_large_image",
      title: post.meta.title,
      description: post.meta.description,
    },
  }
}

/**
 * Individual blog post page.
 * Renders markdown content with Article JSON-LD structured data.
 */
export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const formattedDate = new Date(post.meta.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.meta.title,
    description: post.meta.description,
    datePublished: post.meta.date,
    author: {
      "@type": "Organization",
      name: post.meta.author,
      url: "https://beaconadmit.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Beacon Admit",
      url: "https://beaconadmit.com",
    },
    mainEntityOfPage: `https://beaconadmit.com/blog/${slug}`,
  }

  return (
    <>
      {/* Article JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <article className="max-w-[780px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-accent transition-colors duration-200 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        {/* Post header */}
        <header className="mb-10">
          {/* Tags */}
          {post.meta.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.meta.tags.map((tag) => (
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

          <h1 className="text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold text-primary leading-tight mb-5">
            {post.meta.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <User className="w-4 h-4" />
              {post.meta.author}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.meta.date}>{formattedDate}</time>
            </span>
          </div>
        </header>

        {/* Post body — rendered as HTML from markdown */}
        <div
          className="prose prose-lg max-w-none
            prose-headings:text-primary prose-headings:font-extrabold
            prose-p:text-muted-foreground prose-p:leading-relaxed
            prose-a:text-accent prose-a:font-bold prose-a:no-underline hover:prose-a:underline
            prose-strong:text-primary prose-strong:font-extrabold
            prose-code:text-accent prose-code:bg-accent/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
            prose-pre:bg-[oklch(0.15_0.02_240)] prose-pre:rounded-xl prose-pre:border prose-pre:border-border/40
            prose-table:border-collapse
            prose-th:bg-primary/5 prose-th:text-primary prose-th:font-extrabold prose-th:text-left prose-th:px-4 prose-th:py-3 prose-th:border prose-th:border-border/40
            prose-td:px-4 prose-td:py-3 prose-td:border prose-td:border-border/40 prose-td:text-muted-foreground
            prose-li:text-muted-foreground
            prose-blockquote:border-accent/40 prose-blockquote:text-muted-foreground
            prose-hr:border-border/40"
          dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }}
        />

        {/* Inline CTA */}
        <CtaBanner />
      </article>
    </>
  )
}

/**
 * Minimal markdown-to-HTML converter.
 * Handles headings, paragraphs, bold, italic, links, lists, tables, code blocks, and horizontal rules.
 * No external dependency required — can be replaced with remark/rehype later.
 */
function markdownToHtml(md: string): string {
  // Normalize line endings to Unix style
  let html = md.replace(/\r\n/g, "\n")

  // Code blocks (fenced)
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_match, lang, code) => {
    const escapedCode = code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
    return `<pre><code class="language-${lang || "text"}">${escapedCode.trim()}</code></pre>`
  })

  // Inline code
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>")

  // Tables
  html = html.replace(
    /^(\|.+\|)\n(\|[\s:|-]+\|)\n((?:\|.+\|\n?)+)/gm,
    (_match, headerRow, _separator, bodyRows) => {
      const headers = headerRow
        .split("|")
        .filter((c: string) => c.trim())
        .map((c: string) => `<th>${c.trim()}</th>`)
        .join("")
      const rows = bodyRows
        .trim()
        .split("\n")
        .map((row: string) => {
          const cells = row
            .split("|")
            .filter((c: string) => c.trim())
            .map((c: string) => `<td>${c.trim()}</td>`)
            .join("")
          return `<tr>${cells}</tr>`
        })
        .join("")
      return `<table><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table>`
    },
  )

  // Headings
  html = html.replace(/^### (.+)$/gm, "<h3>$1</h3>")
  html = html.replace(/^## (.+)$/gm, "<h2>$1</h2>")
  html = html.replace(/^# (.+)$/gm, "<h1>$1</h1>")

  // Horizontal rules
  html = html.replace(/^---$/gm, "<hr />")

  // Bold + italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>")
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>")

  // Links
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2">$1</a>',
  )

  // Mermaid diagrams: replace with custom styled HTML element
  const mermaidRegex = /```mermaid[\s\S]*?```/g
  html = html.replace(mermaidRegex, () => {
    return `<div class="my-12 p-6 sm:p-8 rounded-2xl border border-border/40 bg-card/20 backdrop-blur-sm shadow-xl relative overflow-hidden">
  <div class="absolute inset-0 bg-gradient-to-tr from-accent/5 via-transparent to-primary/5 pointer-events-none"></div>
  
  <div class="relative z-10">
    <h4 class="text-base sm:text-lg font-bold text-primary mb-6 flex items-center gap-2">
      <span class="w-2.5 h-2.5 rounded-full bg-accent animate-pulse"></span>
      Secure Data Pipeline & Encryption Lifecycle
    </h4>
    
    <div class="space-y-8 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-[2px] before:bg-border/40">
      
      <!-- Step 1 -->
      <div class="relative pl-10">
        <div class="absolute left-0 top-1 w-8 h-8 rounded-full bg-background border-2 border-accent flex items-center justify-center text-xs font-bold text-accent">1</div>
        <div>
          <div class="flex flex-wrap items-center gap-2 mb-1">
            <h5 class="text-sm font-bold text-primary">Patient Caller</h5>
            <span class="inline-flex items-center text-[10px] font-medium bg-accent/10 text-accent px-2 py-0.5 rounded-md border border-accent/20">SIP / TLS 1.3 & SRTP</span>
          </div>
          <p class="text-xs text-muted-foreground">Inbound voice stream initiated by client or family member. Transport layer encrypted to prevent interception.</p>
        </div>
      </div>
      
      <!-- Step 2 -->
      <div class="relative pl-10">
        <div class="absolute left-0 top-1 w-8 h-8 rounded-full bg-background border-2 border-border/80 flex items-center justify-center text-xs font-bold text-muted-foreground">2</div>
        <div>
          <div class="flex flex-wrap items-center gap-2 mb-1">
            <h5 class="text-sm font-bold text-primary">Secure Telecom Gateway</h5>
            <span class="inline-flex items-center text-[10px] font-medium bg-accent/10 text-accent px-2 py-0.5 rounded-md border border-accent/20">WebSockets (Secure)</span>
          </div>
          <p class="text-xs text-muted-foreground">Terminates PSTN connection and routes real-time audio streams via encrypted WebSockets to the processing node.</p>
        </div>
      </div>
      
      <!-- Step 3 -->
      <div class="relative pl-10">
        <div class="absolute left-0 top-1 w-8 h-8 rounded-full bg-background border-2 border-border/80 flex items-center justify-center text-xs font-bold text-muted-foreground">3</div>
        <div>
          <div class="flex flex-wrap items-center gap-2 mb-1">
            <h5 class="text-sm font-bold text-primary">Ephemeral Edge Voice Node</h5>
            <span class="inline-flex items-center text-[10px] font-medium bg-green-500/10 text-green-500 px-2 py-0.5 rounded-md border border-green-500/20">RAM-Only Processing</span>
          </div>
          <p class="text-xs text-muted-foreground">Processes audio chunks in volatile memory. No audio data or transcript segments are written to local physical disks.</p>
        </div>
      </div>
      
      <!-- Step 4 -->
      <div class="relative pl-10">
        <div class="absolute left-0 top-1 w-8 h-8 rounded-full bg-background border-2 border-border/80 flex items-center justify-center text-xs font-bold text-muted-foreground">4</div>
        <div>
          <div class="flex flex-wrap items-center gap-2 mb-1">
            <h5 class="text-sm font-bold text-primary">HIPAA-Compliant Transcription Engine</h5>
            <span class="inline-flex items-center text-[10px] font-medium bg-accent/10 text-accent px-2 py-0.5 rounded-md border border-accent/20">Real-Time STT</span>
          </div>
          <p class="text-xs text-muted-foreground">Converts voice audio to raw text streams using a secure, zero-data-retention speech-to-text pipeline.</p>
        </div>
      </div>
      
      <!-- Step 5 -->
      <div class="relative pl-10">
        <div class="absolute left-0 top-1 w-8 h-8 rounded-full bg-background border-2 border-accent flex items-center justify-center text-xs font-bold text-accent">5</div>
        <div>
          <div class="flex flex-wrap items-center gap-2 mb-2">
            <h5 class="text-sm font-bold text-primary">Named Entity Recognition (NER) Tokenizer</h5>
            <span class="inline-flex items-center text-[10px] font-medium bg-accent/10 text-accent px-2 py-0.5 rounded-md border border-accent/20">De-identification Split</span>
          </div>
          <p class="text-xs text-muted-foreground mb-4">Splits data stream to insulate language models from direct contact with Protected Health Information (PHI).</p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <!-- Left branch -->
            <div class="p-3 rounded-lg border border-border/40 bg-background/50">
              <span class="text-[10px] uppercase font-bold tracking-wider text-accent block mb-1">Path A: Non-PHI Token Stream</span>
              <h6 class="text-xs font-bold text-primary mb-1">Secure LLM Orchestrator</h6>
              <p class="text-[11px] text-muted-foreground leading-relaxed">Receives de-identified context (e.g., [NAME_1], [AGE_1]) to determine next conversational turn and gather details.</p>
            </div>
            
            <!-- Right branch -->
            <div class="p-3 rounded-lg border border-border/40 bg-background/50">
              <span class="text-[10px] uppercase font-bold tracking-wider text-green-500 block mb-1">Path B: Protected Vault Stream</span>
              <h6 class="text-xs font-bold text-primary mb-1">Secure Vault (AES-256)</h6>
              <p class="text-[11px] text-muted-foreground leading-relaxed">Encrypts and maps raw identifiers to tokens. Keys managed separately with strict rotation policies.</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Step 6 -->
      <div class="relative pl-10">
        <div class="absolute left-0 top-1 w-8 h-8 rounded-full bg-background border-2 border-border/80 flex items-center justify-center text-xs font-bold text-muted-foreground">6</div>
        <div>
          <div class="flex flex-wrap items-center gap-2 mb-1">
            <h5 class="text-sm font-bold text-primary">EMR Integration Hub</h5>
            <span class="inline-flex items-center text-[10px] font-medium bg-accent/10 text-accent px-2 py-0.5 rounded-md border border-accent/20">Data Re-assembly</span>
          </div>
          <p class="text-xs text-muted-foreground">Re-injects secure identifiers into the LLM's structured intake output inside the HIPAA perimeter before EMR transfer.</p>
        </div>
      </div>
      
      <!-- Step 7 -->
      <div class="relative pl-10">
        <div class="absolute left-0 top-1 w-8 h-8 rounded-full bg-background border-2 border-accent flex items-center justify-center text-xs font-bold text-accent">7</div>
        <div>
          <div class="flex flex-wrap items-center gap-2 mb-1">
            <h5 class="text-sm font-bold text-primary">Electronic Medical Record (EMR) / CRM</h5>
            <span class="inline-flex items-center text-[10px] font-medium bg-green-500/10 text-green-500 px-2 py-0.5 rounded-md border border-green-500/20">OAuth 2.0 & mTLS</span>
          </div>
          <p class="text-xs text-muted-foreground">Final sync to clinical record (e.g. Kipu, Sunwave) via authenticated, secure API endpoints.</p>
        </div>
      </div>
      
    </div>
  </div>
</div>`
  })

  // List processing state machine: handles ordered (1.) and unordered (-, *) lists including nesting
  const lines = html.split("\n")
  const resultLines: string[] = []
  let listStack: { type: "ul" | "ol"; indent: number }[] = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const isHtmlTag = /^\s*</.test(line)

    const ulMatch = !isHtmlTag && line.match(/^(\s*)(?:-|\*)\s+(.+)$/)
    const olMatch = !isHtmlTag && line.match(/^(\s*)(\d+)\.\s+(.+)$/)
    const match = ulMatch || olMatch

    if (match) {
      const indent = match[1].length
      const type = ulMatch ? "ul" : "ol"
      const content = ulMatch ? match[2] : match[3]

      if (listStack.length === 0 || indent > listStack[listStack.length - 1].indent) {
        listStack.push({ type, indent })
        resultLines.push(`<${type}>`)
      } else if (indent < listStack[listStack.length - 1].indent) {
        while (listStack.length > 0 && indent < listStack[listStack.length - 1].indent) {
          const closed = listStack.pop()
          resultLines.push(`</${closed!.type}>`)
        }
        if (listStack.length === 0 || listStack[listStack.length - 1].type !== type) {
          if (listStack.length > 0 && listStack[listStack.length - 1].indent === indent) {
            const closed = listStack.pop()
            resultLines.push(`</${closed!.type}>`)
          }
          listStack.push({ type, indent })
          resultLines.push(`<${type}>`)
        }
      } else if (listStack[listStack.length - 1].type !== type) {
        const closed = listStack.pop()
        resultLines.push(`</${closed!.type}>`)
        listStack.push({ type, indent })
        resultLines.push(`<${type}>`)
      }

      resultLines.push(`<li>${content}</li>`)
    } else {
      while (listStack.length > 0) {
        const closed = listStack.pop()
        resultLines.push(`</${closed!.type}>`)
      }
      resultLines.push(line)
    }
  }

  while (listStack.length > 0) {
    const closed = listStack.pop()
    resultLines.push(`</${closed!.type}>`)
  }
  html = resultLines.join("\n")

  // Paragraphs: wrap remaining loose lines
  html = html
    .split("\n\n")
    .map((block) => {
      const trimmed = block.trim()
      if (!trimmed) return ""
      if (
        trimmed.startsWith("<h") ||
        trimmed.startsWith("<ul") ||
        trimmed.startsWith("<ol") ||
        trimmed.startsWith("<pre") ||
        trimmed.startsWith("<table") ||
        trimmed.startsWith("<hr") ||
        trimmed.startsWith("<blockquote") ||
        trimmed.startsWith("<div")
      ) {
        return trimmed
      }
      return `<p>${trimmed}</p>`
    })
    .join("\n")

  return html
}
