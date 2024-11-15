import { UpdateBlog, DeleteBlog } from "@/components/ui/dashboard/buttons";
import BlogStatus from "@/components/ui/dashboard/status";
import { formatDateToLocal } from "@/lib/utils";
import { getFilteredBlogs } from "@/lib/data";

export default async function BlogTable({ query }: { query: string }) {
  const blogs = await getFilteredBlogs(query);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {blogs?.map(
              (blog: {
                _id: string;
                title: string;
                status: string;
                date: string;
              }) => (
                <div
                  key={blog._id.toString()}
                  className="mb-2 w-full rounded-md bg-white p-4"
                >
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <div className="mb-2 flex items-center">
                        <p>{blog.title}</p>
                      </div>
                    </div>
                    <BlogStatus status={blog.status} />
                  </div>
                  <div className="flex w-full items-center justify-between pt-4">
                    <div>
                      <p>{formatDateToLocal(blog.date)}</p>
                    </div>
                    <div className="flex justify-end gap-2">
                      <UpdateBlog id={blog._id.toString()} />
                      <DeleteBlog id={blog._id.toString()} />
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Title
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>

                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {blogs?.map(
                (blog: { _id: string; title: string; date: string }) => (
                  <tr
                    key={blog._id.toString()}
                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex items-center gap-3">
                        <p>{blog.title}</p>
                      </div>
                    </td>

                    <td className="whitespace-nowrap px-3 py-3">
                      {formatDateToLocal(blog.date)}
                    </td>

                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex justify-end gap-3">
                        <UpdateBlog id={blog._id.toString()} />
                        <DeleteBlog id={blog._id.toString()} />
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
