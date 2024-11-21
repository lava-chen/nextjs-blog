import { FC, ReactNode } from "react";
import "@/components/ui/globals.css";
import type { Metadata } from "next";
import { lusitana } from "@/components/ui/fonts";
import { siteMetadata } from "@/data/siteMetaData";
import Header from "@/components/ui/notes/header";
import { ThemeProviders } from "@/app/(blog-app)/theme-provider";
export const metadata: Metadata = {
  title: {
    template: "%s | Lavachen's Notes",
    default: "Lavachen's Notes",
  },
  description: "Lavachen's Notes is a docs-like page where I put system notes",
};

const NoteLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <html lang={siteMetadata.language} suppressHydrationWarning={true}>
      <meta name="msapplication-TileColor" content="#000000" />
      <meta
        name="theme-color"
        media="(prefers-color-scheme: light)"
        content="#fff"
      />
      <meta
        name="theme-color"
        media="(prefers-color-scheme: dark)"
        content="#000"
      />
      <body
        className={`${lusitana.className} antialiased bg-white pl-[calc(100vw-100%)] text-black antialiased dark:bg-gray-950 dark:text-white`}
      >
        <ThemeProviders>
          <section className="mx-auto  ">
            <Header />
            <div className="flex h-screen">
              <main className="mb-auto">{children}</main>
            </div>
          </section>
        </ThemeProviders>
      </body>
    </html>
  );
};

export default NoteLayout;
