# Voice Remix Studio

Next.js + MongoDB starter app for generating a song in a selected singer's voice (not original singer), using Spotify as source catalog.

## Features (MVP)

- Select a target singer voice.
- Select a song by a different singer.
- Create a generation job and store status in MongoDB.
- Poll job status and play/download generated song.

## Quick start

1. Install dependencies:

```bash
npm install
```

2. Configure env vars:

```bash
cp .env.example .env.local
```

3. Start dev server:

```bash
npm run dev
```

Open http://localhost:3000.

## API routes

- `GET /api/singers`: list available singer voices.
- `GET /api/songs?singerId=<id>`: list songs excluding selected singer.
- `POST /api/generate`: create generation request `{ singerId, songId }`.
- `GET /api/generations/:id`: check generation status.


## Where to get voice transformation service

You have two practical paths:

1. **Managed API provider (fastest launch)**
   - **ElevenLabs** (`https://elevenlabs.io`) — strong API docs, quick integration.
   - **Kits AI** (`https://www.kits.ai`) — music/singing-oriented workflows.
   - **Voicify AI** (`https://voicify.ai`) — creator-oriented voice-cover features.

2. **Self-hosted model stack (most control)**
   - **RVC / So-VITS-SVC** style pipelines for custom training/inference.
   - Best when you need full control over quality, privacy, and cost model.

### Recommendation for this app

- Start with **ElevenLabs** or **Kits AI** to validate UX and demand quickly.
- Keep provider calls behind a single server-side adapter so you can switch vendors without frontend rewrites.
- Confirm each provider's policy for copyrighted content and voice rights before launch.

## What you need to provide next

- Spotify app credentials.
- MongoDB cluster details.
- Voice conversion provider and API credentials.
- Storage/CDN target for final audio files.
- Legal/compliance constraints and geo restrictions.

## Notes

This repository uses mocked singer/song data and a mocked asynchronous generation completion. The next implementation step is replacing mock catalog + mock generation with real Spotify ingestion and provider-backed voice transformation.
