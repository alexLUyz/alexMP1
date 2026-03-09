export function buildAiReply(message) {
  const text = message.trim();
  const lower = text.toLowerCase();

  if (!text) {
    return "I didn't catch that. Could you type a message?";
  }

  if (lower.includes('hello') || lower.includes('hi')) {
    return 'Hello! 👋 I am your AI assistant. How can I help today?';
  }

  if (lower.includes('help')) {
    return 'I can help with brainstorming, explaining concepts, writing drafts, and answering questions.';
  }

  if (lower.includes('weather')) {
    return "I can't access live weather right now, but I can help you interpret a forecast if you share one.";
  }

  return `You said: "${text}"\n\nHere's a quick suggestion: break your goal into small steps, tackle the first one, and iterate.`;
}
