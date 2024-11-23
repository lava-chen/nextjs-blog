import "@/components/ui/globals.css";
import type { Metadata } from "next";
import { lusitana } from "@/components/ui/fonts";
import Header from "@/components/ui/header";
import { ThemeProviders } from "./theme-provider";
import SectionContainer from "@/components/ui/SectionContainer";
import { siteMetadata } from "@/data/siteMetaData";
import Footer from "@/components/ui/footer";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: {
    template: "%s | Lavachen's Blog",
    default: "Lavachen's Blog",
  },
  description:
    "Lavachen's Blog where I write about programming, web development, and other topics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
      <script
        defer
        src="https://cloud.umami.is/script.js"
        data-website-id="75bcfa41-73a0-4fd4-a6fe-4d18220d5c57"
      ></script>
      <body
        className={`${lusitana.className} antialiased bg-white pl-[calc(100vw-100%)] text-black antialiased dark:bg-gray-950 dark:text-white`}
      >
        <ThemeProviders>
          <SectionContainer>
            <Header />
            <main className="mb-auto ">{children}</main>
            <Analytics />
            <Footer />
          </SectionContainer>
        </ThemeProviders>
      </body>
    </html>
  );
}
