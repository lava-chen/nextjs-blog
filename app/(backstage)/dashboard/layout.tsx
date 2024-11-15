import SideNav from "@/components/ui/dashboard/sidenav";
import { lusitana } from "@/components/ui/fonts";
import { siteMetadata } from "@/data/siteMetaData";
import "@/components/ui/globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
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
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
          <div className="w-full flex-none md:w-64">
            <SideNav />
          </div>
          <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
