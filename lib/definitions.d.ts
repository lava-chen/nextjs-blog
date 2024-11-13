import type {
  Markdown,
  MDX,
  ImageFieldData,
  IsoDateTimeString,
} from "contentlayer2/core";
import * as Local from "contentlayer2/source-files";

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
  images?: any | undefined;
  layout?: string | undefined;
  bibliography?: string | undefined;
  canonicalUrl?: string | undefined;
  /** MDX file body */
  content: string;
  readingTime: Object;
  slug: string;
  toc: Object;
};
