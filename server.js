const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3000;
const publicDir = path.join(__dirname, 'public');

function buildAiReply(message) {
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

function getContentType(filePath) {
  if (filePath.endsWith('.html')) return 'text/html; charset=utf-8';
  if (filePath.endsWith('.css')) return 'text/css; charset=utf-8';
  if (filePath.endsWith('.js')) return 'application/javascript; charset=utf-8';
  return 'text/plain; charset=utf-8';
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(payload));
}

function requestHandler(req, res) {
  if (req.method === 'POST' && req.url === '/api/chat') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > 1e6) {
        req.socket.destroy();
      }
    });

    req.on('end', () => {
      try {
        const parsed = JSON.parse(body || '{}');
        if (typeof parsed.message !== 'string') {
          return sendJson(res, 400, { error: 'message must be a string' });
        }

        return sendJson(res, 200, { reply: buildAiReply(parsed.message) });
      } catch {
        return sendJson(res, 400, { error: 'invalid JSON body' });
      }
    });

    return;
  }

  if (req.method !== 'GET') {
    res.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Method Not Allowed');
    return;
  }

  let filePath = req.url === '/' ? '/index.html' : req.url;
  filePath = path.normalize(filePath).replace(/^\.\.(\/|\\|$)/, '');

  const fullPath = path.join(publicDir, filePath);
  const safePath = path.resolve(fullPath);
  if (!safePath.startsWith(path.resolve(publicDir))) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Forbidden');
    return;
  }

  fs.readFile(safePath, (err, data) => {
    if (err) {
      fs.readFile(path.join(publicDir, 'index.html'), (fallbackErr, fallbackData) => {
        if (fallbackErr) {
          res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
          res.end('Internal Server Error');
          return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(fallbackData);
      });
      return;
    }

    res.writeHead(200, { 'Content-Type': getContentType(safePath) });
    res.end(data);
  });
}

function startServer() {
  const server = http.createServer(requestHandler);
  server.listen(port, () => {
    console.log(`AI chatbot app running on http://localhost:${port}`);
  });
  return server;
}

if (require.main === module) {
  startServer();
}

module.exports = { buildAiReply, requestHandler, startServer };
