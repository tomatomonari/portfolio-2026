import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const contentDirectory = path.join(process.cwd(), "content");

export type ContentType = "work" | "project" | "program";

export interface ContentFrontmatter {
  title: string;
  subtitle: string;
  date: string;
  type: ContentType;
  tags: string[];
  featured: boolean;
  color?: string;
}

export interface ContentItem {
  slug: string;
  frontmatter: ContentFrontmatter;
  content: string;
}

export interface ContentItemWithHtml extends ContentItem {
  contentHtml: string;
}

/**
 * Get all content file slugs
 */
export function getAllContentSlugs(): string[] {
  const fileNames = fs.readdirSync(contentDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => fileName.replace(/\.md$/, ""));
}

/**
 * Get all content items (frontmatter only, no rendered HTML)
 */
export function getAllContent(): ContentItem[] {
  const slugs = getAllContentSlugs();
  return slugs.map((slug) => getContentBySlug(slug));
}

/**
 * Get content by slug (frontmatter + raw content)
 */
export function getContentBySlug(slug: string): ContentItem {
  const fullPath = path.join(contentDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    frontmatter: data as ContentFrontmatter,
    content,
  };
}

/**
 * Get content by slug with rendered HTML
 */
export async function getContentBySlugWithHtml(
  slug: string
): Promise<ContentItemWithHtml> {
  const item = getContentBySlug(slug);
  const processedContent = await remark()
    .use(html, { sanitize: false })
    .process(item.content);
  const contentHtml = processedContent.toString();

  return {
    ...item,
    contentHtml,
  };
}

/**
 * Get all content filtered by type
 */
export function getContentByType(type: ContentType): ContentItem[] {
  return getAllContent().filter((item) => item.frontmatter.type === type);
}

/**
 * Get all featured content
 */
export function getFeaturedContent(): ContentItem[] {
  return getAllContent().filter((item) => item.frontmatter.featured);
}

/**
 * Get all unique tags across all content
 */
export function getAllTags(): string[] {
  const allContent = getAllContent();
  const tagsSet = new Set<string>();
  allContent.forEach((item) => {
    item.frontmatter.tags.forEach((tag) => tagsSet.add(tag));
  });
  return Array.from(tagsSet).sort();
}

/**
 * Get content by tag
 */
export function getContentByTag(tag: string): ContentItem[] {
  return getAllContent().filter((item) =>
    item.frontmatter.tags.includes(tag)
  );
}

/**
 * Get static paths for dynamic routes
 * Returns paths in format: [{ params: { type: 'work', slug: 'ox' } }, ...]
 */
export function getContentStaticParams(): { type: string; slug: string }[] {
  const allContent = getAllContent();
  return allContent.map((item) => ({
    type: item.frontmatter.type,
    slug: item.slug,
  }));
}
