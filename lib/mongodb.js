let cachedClient = null;
let cachedDb = null;

export async function getDb() {
  if (cachedDb) return cachedDb;

  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB || 'ai_chatbot';

  if (!uri) {
    throw new Error('Missing MONGODB_URI environment variable');
  }

  const { MongoClient } = await import('mongodb');
  if (!cachedClient) {
    cachedClient = new MongoClient(uri);
    await cachedClient.connect();
  }

  cachedDb = cachedClient.db(dbName);
  return cachedDb;
}
