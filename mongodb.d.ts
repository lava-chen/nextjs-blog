import { MongoClient, ObjectId } from "mongodb";

declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}

export { MongoClient, ObjectId };
