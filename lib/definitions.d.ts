import type { IsoDateTimeString } from "contentlayer2/core";

export type Blog = {
  /** File path relative to `contentDirPath` */
  id: string;
  type: "Blog";
  title: string;
  date: IsoDateTimeString;
  tags: string[];
  lastmod?: IsoDateTimeString | undefined;
  status?: "draft" | "posted";
  summary?: string | undefined;
  images?: string[] | undefined;
  layout?: string | undefined;
  bibliography?: string | undefined;
  canonicalUrl?: string | undefined;
  /** MDX file body */
  content: string;
  readingTime: object;
  slug: string;
  toc: object;
};
