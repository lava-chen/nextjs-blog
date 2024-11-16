import clientPromise from "@/lib/route";

export async function getBlogs() {
  const client = await clientPromise;
  await client.connect();
  try {
    const db = client.db("blog");
    const blogs = await db.collection("blogs").find({}).toArray();
    return blogs;
  } catch (error) {
    console.error("获取博客列表时出错:", error);
    throw error;
  }
}
const ITEMS_PER_PAGE = 6;

export async function getBlogsPage(query: string) {
  const client = await clientPromise;
  try {
    await client.connect();
    const db = client.db("blog");
    const count = await db.collection("blogs").countDocuments({
      $or: [
        { title: { $regex: query, $options: "i" } }, // 忽略大小写的标题匹配
        { content: { $regex: query, $options: "i" } }, // 忽略大小写的内容匹配
      ],
    });
    return Math.ceil(count / ITEMS_PER_PAGE);
  } catch (error) {
    console.error("获取博客页数时出错:", error); // 错误处理
    throw new Error("无法获取博客页数"); // 抛出错误
  } finally {
    await client.close(); // 在 finally 块中关闭连接
  }
}

export async function getFilteredBlogs(query: string) {
  const client = await clientPromise;
  await client.connect();
  try {
    const db = client.db("blog");
    const blogs = await db
      .collection("blogs")
      .find({
        $or: [
          { title: { $regex: query, $options: "i" } }, // 忽略大小写的标题匹配
          { content: { $regex: query, $options: "i" } }, // 忽略大小写的内容匹配
        ],
      })
      .toArray();
    return blogs;
  } finally {
    await client.close(); // 在 finally 块中关闭连接
  }
}

export async function getUser(email: string) {
  const client = await clientPromise;
  await client.connect();
  try {
    const db = client.db("blog");
    const user = await db.collection("users").findOne({ email });
    return user;
  } finally {
    await client.close(); // 在 finally 块中关闭连接
  }
}
