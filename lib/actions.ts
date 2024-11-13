"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import AuthError from "next-auth";
import client from "@/lib/route"; // 假设您有一个数据库连接模块
import { generateTOCFromMarkdown, calculateReadingTime } from "@/lib/utils";
import { slug } from "github-slugger";
import { ObjectId } from "mongodb";

export async function deleteBlog(id: string) {
  try {
    // 连接数据库
    await client.connect();
    const database = client.db("blog");
    const blogsCollection = database.collection("blogs"); // 替换为您的集合名称

    // 执行删除操作
    const result = await blogsCollection.deleteOne({ _id: new ObjectId(id) });

    // 检查删除是否成功
    if (result.deletedCount === 1) {
      console.log(`成功删除博客，ID: ${id}`);
    } else {
      console.log(`未找到 ID 为 ${id} 的博客`);
    }
  } catch (error) {
    console.error("删除博客时发生错误:", error);
  } finally {
    // 关闭数据库连接
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
    .then((text) => {
      URL.revokeObjectURL(fileURL);
      return text;
    })
    .catch((error) => {
      console.error("文件读取失败:", error);
      throw error;
    });

  const toc = generateTOCFromMarkdown(contentFileString);
  const readingTime = calculateReadingTime(contentFileString);
  // Validate form using Zod
  const validatedFields = CreateBlog.safeParse({
    title: formData.get("title"),
    content: contentFileString,
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
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Blog.",
    };
  } finally {
    await client.close();
  }

  revalidatePath("/dashboard/blogs");
  redirect("/dashboard/blogs");
}
