import { getDb } from './mongodb.js';

const inMemoryHistory = [];

export async function saveChatMessage(role, content) {
  const doc = {
    role,
    content,
    createdAt: new Date()
  };

  try {
    const db = await getDb();
    await db.collection('messages').insertOne(doc);
  } catch {
    inMemoryHistory.push(doc);
  }

  return doc;
}

export async function getRecentMessages(limit = 20) {
  try {
    const db = await getDb();
    return db
      .collection('messages')
      .find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray();
  } catch {
    return inMemoryHistory.slice(-limit).reverse();
  }
}
