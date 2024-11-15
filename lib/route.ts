import { MongoClient } from "mongodb";

let client: MongoClient;

if (!global._mongoClientPromise) {
  client = new MongoClient(process.env.MONGODB_URI, {
    connectTimeoutMS: 30000,
    socketTimeoutMS: 30000,
    useUnifiedTopology: true,
  });
  global._mongoClientPromise = client.connect();
}

const clientPromise = global._mongoClientPromise;

export default clientPromise;
