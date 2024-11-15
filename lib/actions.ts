"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import clientPromise from "@/lib/route"; // 假设您有一个数据库连接模块
import { generateTOCFromMarkdown, calculateReadingTime } from "@/lib/utils";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import { remark } from "remark";
import { ObjectId } from "mongodb";

export async function deleteBlog(_id: string) {
  const client = await clientPromise;
  try {
    await client.connect();
    const database = client.db("blog");
    const blogsCollection = database.collection("blogs");
    const objectId = new ObjectId(_id);
    const result = await blogsCollection.deleteOne({ _id: objectId });
    revalidatePath("/dashboard/blogs");

    if (result.deletedCount === 1) {
      console.log(`成功删除博客，ID: ${_id}`);
    } else {
      console.log(`未找到 ID 为 ${_id} 的博客`);
    }
  } catch (error) {
    console.error("删除博客时发生错误:", error);
  } finally {
    await client.close();
  }
}

export type State = {
  errors?: {
    title?: string[];
    content?: string[];
    status?: string[];
  };
  message?: string | null;
};

const FormSchema = z.object({
  title: z.string().min(1, { message: "Please enter a title." }),
  content: z.string(),
  summary: z.string().optional().nullable(), // summary 为可选项
  status: z.enum(["draft", "published"], {
    invalid_type_error: "Please select a blog status.",
  }),
  date: z.string(),
  tags: z.array(z.string()).optional(), // tags 为可选数组
  layout: z.string().optional().nullable(), // layout 为可选项
  slug: z.string().optional().nullable(), // slug 为可选项
  toc: z
    .array(
      z.object({
        // 添加 toc 属性
        value: z.string(), // 标题内容
        url: z.string(), // 生成的 URL
        depth: z.number(), // 标题级别对应的深度值
      })
    )
    .optional(),
  readingTime: z
    .array(
      z.object({
        text: z.string(),
        minutes: z.number(),
        time: z.number(),
        words: z.number(),
      })
    )
    .optional(),
});

const CreateBlog = FormSchema.omit({ date: true });

export async function createBlog(prevState: State, formData: FormData) {
  const contentFile = formData.get("content") as File;
  const fileURL = URL.createObjectURL(contentFile);

  const contentFileString = await fetch(fileURL)
    .then((response) => response.text())
    .finally(() => URL.revokeObjectURL(fileURL));

  const processedContent = await remark()
    .use(remarkParse)
    .use(remarkMath)
    .use(remarkRehype)
    .use(rehypeKatex)
    .use(rehypeStringify)
    .use(remarkGfm)
    .process(contentFileString);

  const contentHtml = processedContent.toString();
  const toc = generateTOCFromMarkdown(contentFileString);
  const readingTime = calculateReadingTime(contentFileString);

  const validatedFields = CreateBlog.safeParse({
    title: formData.get("title"),
    content: contentHtml,
    summary: formData.get("summary"),
    status: formData.get("status"),
    tags: formData.getAll("tags"),
    layout: formData.get("layout"),
    slug: formData.get("slug"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Blog.",
    };
  }

  const { title, content, summary, status, tags, layout, slug } =
    validatedFields.data;
  const date = new Date().toISOString();
  const client = await clientPromise;

  try {
    await client.connect();
    const db = client.db("blog");
    await db.collection("blogs").insertOne({
      type: "blog",
      title,
      date,
      content,
      status,
      summary,
      tags,
      layout,
      slug,
      toc,
      readingTime,
    });
    console.log("Blog created successfully.");
    revalidatePath("/dashboard/blogs");
    redirect("/dashboard/blogs");
  } catch (error) {
    console.error("Error creating blog:", error);
    return { message: "Database Error: Failed to Create Blog." };
  } finally {
    await client.close();
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
