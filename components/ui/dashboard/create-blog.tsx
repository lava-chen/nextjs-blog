"use client";
import { Blog } from "@/lib/definitions";
import Link from "next/link";
import { CheckIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/dashboard/buttons";
import { createBlog, State } from "@/lib/actions";
import { useActionState } from "react";

const layouts = ["PostSimple", "PostLayout", "PostBanner"];
const sampleTags = [
  "Tech",
  "Health",
  "Lifestyle",
  "Finance",
  "Travel",
  "Education",
  "Food",
  "Fashion",
];

export default function BlogForm() {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createBlog, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Blog Title */}
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Blog Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            placeholder="Enter your blog title"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Blog Content */}
        <div className="mb-4">
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            Blog Upload
          </label>
          <input
            id="content"
            name="content"
            type="file"
            accept=".md" // 限制上传文件类型为 Markdown 文件
            required
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Blog Summary */}
        <div className="mb-4">
          <label
            htmlFor="summary"
            className="block text-sm font-medium text-gray-700"
          >
            Blog Summary
          </label>
          <textarea
            id="summary"
            name="summary"
            rows={2}
            required
            placeholder="Write a brief summary of your blog"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="slug"
            className="block text-sm font-medium text-gray-700"
          >
            Blog Slug
          </label>
          <textarea
            id="summary"
            name="slug"
            rows={2}
            required
            placeholder="Write a slug of your blog"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Blog Status */}

        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the blog status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="draft"
                  name="status"
                  type="radio"
                  value="draft"
                  defaultChecked
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="draft"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Save as Draft
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="published"
                  name="status"
                  type="radio"
                  value="published"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="published"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Publish
                  <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset>
        {/* 标签选择 */}
        <div className="mb-4">
          <label
            htmlFor="tags"
            className="block text-sm font-medium text-gray-700"
          >
            Select Tags
          </label>
          <select
            id="tags"
            name="tags"
            multiple
            required
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
          >
            {sampleTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>

        {/* Blog Layout Selection */}
        <div className="mb-4">
          <label
            htmlFor="layout"
            className="block text-sm font-medium text-gray-700"
          >
            Select Blog Layout
          </label>
          <select
            id="layout"
            name="layout"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
          >
            {layouts.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/blogs"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Blog</Button>
      </div>
    </form>
  );
}
