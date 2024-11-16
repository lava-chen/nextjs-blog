import clientPromise from "@/lib/route";

export async function GET() {
  try {
    const client = await clientPromise;
    await client.connect();
    const db = client.db("blog");
    const blogsCollection = db.collection("blogs");
    const blogs = await blogsCollection.find({}).toArray();
    return new Response(JSON.stringify(blogs), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Error fetching data", { status: 500 });
  }
}
