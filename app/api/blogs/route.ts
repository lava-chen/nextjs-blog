import { MongoClient } from "mongodb";

const clientPromise = MongoClient.connect(process.env.MONGODB_URI);

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("blog");
    const blogsCollection = db.collection("blogs");
    const blogs = await blogsCollection.find({}).toArray();

    return new Response(JSON.stringify(blogs), { status: 200 });
  } catch (error) {
    return new Response("Error fetching data", { status: 500 });
  }
}
