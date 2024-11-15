import Pagination from "@/components/ui/dashboard/pagination";
import Search from "@/components/ui/search";
import Table from "@/components/ui/dashboard/table";
import { CreateBlog } from "@/components/ui/dashboard/buttons";
import { lusitana } from "@/components/ui/fonts";
import BlogTableSkeleton from "@/components/ui/dashboard/skeletons";
import { Suspense } from "react";
import { getBlogsPage } from "@/lib/data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs Manage",
};
export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await getBlogsPage(query);
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Blogs</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search blogs..." />
        <CreateBlog />
      </div>
      <Suspense key={query + currentPage} fallback={<BlogTableSkeleton />}>
        <Table query={query} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
