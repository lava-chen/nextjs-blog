import client from "@/lib/route";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const db = client.db("blog");
    const blogs = await db.collection("blogs").find({}).toArray();
    res.json(blogs);
  } catch (e) {
    console.error(e);
  }
};
