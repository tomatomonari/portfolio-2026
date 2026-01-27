import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MarkdownContent } from "@/components/ui/MarkdownContent";
import { TechIcons } from "@/components/ui/TechIcons";
import {
  getContentBySlug,
  getContentStaticParams,
  getAllContentSlugs,
} from "@/lib/content";

interface ContentPageProps {
  params: Promise<{
    type: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return getContentStaticParams();
}

export async function generateMetadata({ params }: ContentPageProps) {
  const { slug } = await params;
  const slugs = getAllContentSlugs();

  if (!slugs.includes(slug)) {
    return { title: "Not Found" };
  }

  const content = getContentBySlug(slug);
  return {
    title: `${content.frontmatter.title} | Portfolio`,
    description: content.frontmatter.subtitle,
  };
}

export default async function ContentPage({ params }: ContentPageProps) {
  const { type, slug } = await params;
  const slugs = getAllContentSlugs();

  if (!slugs.includes(slug)) {
    notFound();
  }

  const content = getContentBySlug(slug);

  // Verify the type matches
  if (content.frontmatter.type !== type) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-bg-main">
      <div className="max-w-2xl mx-auto px-6 py-16 md:py-24">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-violet-600 transition-colors mb-12 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        {/* Header */}
        <header className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1.5 text-sm font-medium bg-violet-100 text-violet-700 rounded-full capitalize">
              {content.frontmatter.type}
            </span>
            <span className="text-slate-400 text-sm">{content.frontmatter.date}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold text-[#3d3a50] mb-4 leading-tight tracking-tight">
            {content.frontmatter.title}
          </h1>
          <p className="text-xl text-[#4a4a6a] leading-relaxed">{content.frontmatter.subtitle}</p>

          {/* Tech Stack Icons */}
          {content.frontmatter.tech && content.frontmatter.tech.length > 0 && (
            <TechIcons tech={content.frontmatter.tech} />
          )}

          {/* Tags */}
          {content.frontmatter.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-8">
              {content.frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm bg-slate-100 text-slate-500 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Content - Using client component for markdown rendering */}
        <MarkdownContent content={content.content} />
      </div>
    </div>
  );
}
