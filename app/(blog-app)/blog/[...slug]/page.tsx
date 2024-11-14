import { notFound } from "next/navigation";
import { Metadata } from "next";
import siteMetadata from "@/data/siteMetaData";
import type { Blog } from "@/lib/definitions";
import { remark } from "remark";
import { getBlogs } from "@/lib/data";
import React from "react";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import "katex/dist/katex.min.css";

export async function generateMetadata(props: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata | undefined> {
  const params = await props.params;
  const slug = decodeURI(params.slug.join("/"));
  const allBlogs = await getBlogs();
  const post = allBlogs.find((p: { slug: string }) => p.slug === slug);

  if (!post) {
    return;
  }

  const publishedAt = new Date(post.date).toISOString();
  const modifiedAt = new Date(post.lastmod || post.date).toISOString();

  let imageList = [siteMetadata.socialBanner];
  if (post.images) {
    imageList = typeof post.images === "string" ? [post.images] : post.images;
  }

  const ogImages = imageList.map((img) => ({
    url: img.includes("http") ? img : siteMetadata.siteUrl + img,
  }));

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      siteName: siteMetadata.title,
      locale: "en_US",
      type: "article",
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      url: "./",
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      images: imageList,
    },
  };
}

export default async function Page(props: {
  params: Promise<{ slug: string[] }>;
}) {
  const params = await props.params;
  const slug = decodeURI(params.slug.join("/"));

  const allBlogs = await getBlogs();

  const post = allBlogs.find(
    (p: { slug: string }) => p.slug === slug
  ) as unknown as Blog;

  if (!post) {
    return notFound();
  }

  const markdown = await post.content;
  const processedContent = await remark()
    .use(remarkParse)
    .use(remarkMath)
    .use(remarkRehype)
    .use(rehypeKatex)
    .use(rehypeStringify)
    .use(remarkGfm)

    .process(markdown);
  const contentHtml = processedContent.toString();
  const publishedDate = new Date(post.date).toLocaleDateString();

  return (
    <>
      <div className="text-gray-500 dark:text-gray-400 mb-2 flex justify-center">
        {publishedDate}
      </div>{" "}
      {/* 显示日期 */}
      <div className="container flex  justify-center">
        <div
          className="prose dark:prose-dark"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </div>
    </>
  );
}
