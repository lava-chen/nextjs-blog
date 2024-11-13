export type Blog = {
  /** File path relative to `contentDirPath` */
  _id: string;
  _raw: Local.RawDocumentData;
  type: "Blog";
  title: string;
  date: IsoDateTimeString;
  tags: string[];
  lastmod?: IsoDateTimeString | undefined;
  draft?: boolean | undefined;
  summary?: string | undefined;
  images?: any | undefined;
  authors?: string[] | undefined;
  layout?: string | undefined;
  bibliography?: string | undefined;
  canonicalUrl?: string | undefined;
  /** MDX file body */
  body: MDX;
  readingTime: json;
  slug: string;
  path: string;
  filePath: string;
  toc: json;
  structuredData: json;
};
