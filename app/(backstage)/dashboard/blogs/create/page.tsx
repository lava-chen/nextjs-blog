import Form from "@/components/ui/dashboard/create-blog";
import Breadcrumbs from "@/components/ui/dashboard/breadcrumbs";

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Blogs", href: "/dashboard/blogs" },
          {
            label: "Create Blog",
            href: "/dashboard/blogs/create",
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
