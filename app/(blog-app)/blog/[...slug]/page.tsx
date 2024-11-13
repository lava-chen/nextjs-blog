import { MDXLayoutRenderer } from "pliny/mdx-components";
import { getBlogs } from "@/lib/data";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import siteMetadata from "@/data/siteMetaData";
import type { Blog } from "@/lib/definitions";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  sortPosts,
  coreContent,
  allCoreContent,
} from "pliny/utils/contentlayer";
import PostSimple from "@/components/layouts/PostSimple";
import React from "react";

const defaultLayout = "PostLayout";
type LayoutKey = "PostSimple" | "PostLayout" | "PostBanner";
const layouts = {
  PostSimple,
};

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
  const ogImages = imageList.map((img) => {
    return {
      url: img.includes("http") ? img : siteMetadata.siteUrl + img,
    };
  });

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
  const params = await props.params; // 等待 params 被解析
  const slug = decodeURI(params.slug.join("/"));

  const allBlogs = await getBlogs();
  const sortedCoreContents = allCoreContent(sortPosts(allBlogs));
  const postIndex = sortedCoreContents.findIndex((p: Blog) => p.slug === slug);
  if (postIndex === -1) {
    return notFound();
  }

  const prev = sortedCoreContents[postIndex + 1];
  const next = sortedCoreContents[postIndex - 1];
  const post = allBlogs.find(
    (p: { slug: string }) => p.slug === slug
  ) as unknown as Blog;
  if (!post) {
    // 处理找不到 post 的情况
    return notFound();
  }
  const markdown = await post.content;
  const mainContent = coreContent(post);

  return (
    <>
      <MDXRemote source={markdown} />
    </>
  );
}
