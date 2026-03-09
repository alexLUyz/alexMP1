'use client';

import { useState } from 'react';

export default function HomePage() {
  const [messages, setMessages] = useState([
    { role: 'bot', content: 'Hi! I am your AI chatbot. Ask me anything to get started.' }
  ]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const text = input.trim();
    if (!text || isSending) return;

    const userMessage = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsSending(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });

      const data = await response.json();
      const botText = data?.reply || 'No response generated.';
      setMessages((prev) => [...prev, { role: 'bot', content: botText }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'bot', content: 'Unable to reach the chat API right now.' }
      ]);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <main className="container">
      <header className="chat-header">
        <h1>AI Chatbot</h1>
        <p>Next.js + MongoDB chat history</p>
      </header>

      <section className="chat-window" aria-live="polite">
        {messages.map((message, index) => (
          <div key={`${message.role}-${index}`} className={`message ${message.role}`}>
            {message.content}
          </div>
        ))}
      </section>

      <form className="chat-form" onSubmit={handleSubmit}>
        <label htmlFor="message" className="sr-only">
          Message
        </label>
        <input
          id="message"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Type your message..."
          autoComplete="off"
          required
        />
        <button type="submit" disabled={isSending}>
          {isSending ? 'Sending...' : 'Send'}
        </button>
      </form>
    </main>
  );
}
