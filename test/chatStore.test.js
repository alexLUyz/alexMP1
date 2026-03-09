import test from 'node:test';
import assert from 'node:assert/strict';
import { getRecentMessages, saveChatMessage } from '../lib/chatStore.js';

test('chatStore saves and returns messages via fallback memory store when MongoDB is unavailable', async () => {
  const uniqueContent = `hello-${Date.now()}`;
  await saveChatMessage('user', uniqueContent);

  const recent = await getRecentMessages(50);
  const found = recent.find((message) => message.content === uniqueContent);

  assert.ok(found);
  assert.equal(found.role, 'user');
});
