import { buildAiReply } from '../../../lib/chatbot.js';
import { getRecentMessages, saveChatMessage } from '../../../lib/chatStore.js';

export async function POST(request) {
  let payload;

  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: 'invalid JSON body' }, { status: 400 });
  }

  const { message } = payload || {};
  if (typeof message !== 'string') {
    return Response.json({ error: 'message must be a string' }, { status: 400 });
  }

  const reply = buildAiReply(message);
  await saveChatMessage('user', message);
  await saveChatMessage('bot', reply);
  const history = await getRecentMessages(10);

  return Response.json({ reply, history });
}
