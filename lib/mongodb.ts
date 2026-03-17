import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Please define MONGODB_URI in .env.local");
}

const globalWithMongo = global as typeof globalThis & {
  mongoClientPromise?: Promise<MongoClient>;
};

const client = new MongoClient(uri);
const clientPromise = globalWithMongo.mongoClientPromise ?? client.connect();

if (process.env.NODE_ENV !== "production") {
  globalWithMongo.mongoClientPromise = clientPromise;
}

export default clientPromise;
