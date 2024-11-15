import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

const getMongoClient = (): MongoClient => {
  if (!uri) {
    throw new Error("MongoDB URI is not set in environment variables.");
  }
  console.log("Creating new MongoClient instance.");
  return new MongoClient(uri, options);
};

const client = getMongoClient();

export default client;
