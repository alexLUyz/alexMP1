# AI Chatbot Webapp (Next.js + MongoDB)

This project is an AI chatbot webapp using **Next.js (App Router)** and **MongoDB** for chat history storage.

## Features

- Next.js framework with API routes
- `POST /api/chat` endpoint for chatbot responses
- MongoDB persistence for user/bot messages (`messages` collection)
- In-memory fallback when MongoDB is unavailable (for local/test resilience)
- Responsive chat UI

## Environment variables

Create a `.env.local` file:

```bash
MONGODB_URI=mongodb://localhost:27017
MONGODB_DB=ai_chatbot
```

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Run tests

```bash
npm test
```
