const chatWindow = document.getElementById('chatWindow');
const chatForm = document.getElementById('chatForm');
const messageInput = document.getElementById('messageInput');

function appendMessage(role, text) {
  const msg = document.createElement('div');
  msg.className = `message ${role}`;
  msg.textContent = text;
  chatWindow.appendChild(msg);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

async function sendMessage(message) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message })
  });

  if (!response.ok) {
    const fallback = 'Sorry, something went wrong while contacting the chatbot API.';
    appendMessage('bot', fallback);
    return;
  }

  const data = await response.json();
  appendMessage('bot', data.reply || 'No reply returned.');
}

chatForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const message = messageInput.value.trim();
  if (!message) {
    return;
  }

  appendMessage('user', message);
  messageInput.value = '';
  await sendMessage(message);
});

appendMessage('bot', 'Hi! I am your AI chatbot. Ask me anything to get started.');
