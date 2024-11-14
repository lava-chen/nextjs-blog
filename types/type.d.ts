declare module "mdx/types" {
  export type MDXComponents = {
    [key: string]: React.ComponentType<any>;
  };
}

declare module "pliny/ui/Pre";
declare module "pliny/ui/TOCInline";
declare module "pliny/ui/BlogNewsletterForm";
declare module "pliny/utils/contentlayer";
declare module "pliny/utils/formatDate";
declare module "pliny/mdx-components";
declare module "pliny/comments";
declare module "pliny/utils/contentlayer";
declare module "@heroicons/react/24/outline";
declare module "markdown-it";
declare module "contentlayer/source-files";
declare module "bcrypt";

declare module "layouts" {
  export const PostSimple: any;
  export const PostLayout: any;
  export const PostBanner: any;
}
