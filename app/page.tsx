"use client";

import { useEffect, useMemo, useState } from "react";
import type { Singer, Song } from "@/lib/types";
import { voiceProviders } from "@/lib/voiceProviders";

type GenerationResponse = {
  id: string;
  status: "queued" | "processing" | "completed" | "failed";
  outputUrl?: string;
};

export default function HomePage() {
  const [singers, setSingers] = useState<Singer[]>([]);
  const [songs, setSongs] = useState<Song[]>([]);
  const [selectedSingerId, setSelectedSingerId] = useState("");
  const [selectedSongId, setSelectedSongId] = useState("");
  const [generation, setGeneration] = useState<GenerationResponse | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    void fetch("/api/singers")
      .then((response) => response.json())
      .then((data: { data: Singer[] }) => setSingers(data.data));
  }, []);

  useEffect(() => {
    const query = selectedSingerId ? `?singerId=${selectedSingerId}` : "";
    void fetch(`/api/songs${query}`)
      .then((response) => response.json())
      .then((data: { data: Song[] }) => {
        setSongs(data.data);
        setSelectedSongId("");
      });
  }, [selectedSingerId]);

  useEffect(() => {
    if (!generation?.id || generation.status === "completed" || generation.status === "failed") {
      return;
    }

    const timer = setInterval(() => {
      void fetch(`/api/generations/${generation.id}`)
        .then((response) => response.json())
        .then((data: GenerationResponse) => setGeneration(data));
    }, 1500);

    return () => clearInterval(timer);
  }, [generation]);

  const selectedSinger = useMemo(
    () => singers.find((singer) => singer.id === selectedSingerId),
    [singers, selectedSingerId],
  );

  const canGenerate = Boolean(selectedSingerId && selectedSongId && !loading);

  async function handleGenerate() {
    setLoading(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ singerId: selectedSingerId, songId: selectedSongId }),
    });

    const data = (await response.json()) as GenerationResponse;
    setGeneration(data);
    setLoading(false);
  }

  return (
    <main>
      <h1>Voice Remix Studio (Next.js + MongoDB)</h1>
      <p>
        Pick a singer voice, then choose a song by a different singer from Spotify-linked catalog.
        The app generates a new voice cover and lets the user listen or download it.
      </p>

      <div className="row">
        <section className="card">
          <label htmlFor="singer">1) Choose target voice singer</label>
          <select
            id="singer"
            value={selectedSingerId}
            onChange={(event) => setSelectedSingerId(event.target.value)}
          >
            <option value="">Select singer</option>
            {singers.map((singer) => (
              <option key={singer.id} value={singer.id}>
                {singer.name}
              </option>
            ))}
          </select>
          <small>Voice model is applied from selected singer.</small>
        </section>

        <section className="card">
          <label htmlFor="song">2) Choose source song (must be different singer)</label>
          <select
            id="song"
            value={selectedSongId}
            onChange={(event) => setSelectedSongId(event.target.value)}
            disabled={!selectedSingerId}
          >
            <option value="">Select song</option>
            {songs.map((song) => (
              <option key={song.id} value={song.id}>
                {song.title} — {song.artistName}
              </option>
            ))}
          </select>
          <small>Catalog currently seeded locally, wire to Spotify search next.</small>
        </section>
      </div>

      <section className="card">
        <button type="button" onClick={handleGenerate} disabled={!canGenerate}>
          {loading ? "Submitting..." : "3) Generate Voice Cover"}
        </button>

        {selectedSinger ? (
          <p>
            Target voice: <strong>{selectedSinger.name}</strong>
          </p>
        ) : null}

        {generation ? (
          <>
            <p>
              Status: <strong>{generation.status}</strong>
            </p>
            {generation.status === "completed" && generation.outputUrl ? (
              <>
                <audio controls src={generation.outputUrl} style={{ width: "100%" }} />
                <p>
                  <a href={generation.outputUrl} download>
                    Download generated track
                  </a>
                </p>
              </>
            ) : null}
          </>
        ) : null}
      </section>

      <section className="card">
        <h2>Where to get a voice transformation service?</h2>
        <p>Start with one of these providers based on your launch goals:</p>
        <ul>
          {voiceProviders.map((provider) => (
            <li key={provider.id}>
              <strong>{provider.name}</strong> — {provider.bestFor}.{" "}
              <a href={provider.website} target="_blank" rel="noreferrer">
                Website
              </a>
              <br />
              <small>{provider.notes}</small>
            </li>
          ))}
        </ul>
      </section>

      <section className="card">
        <h2>What I need from you to make this production-ready</h2>
        <ul>
          <li>Spotify API credentials (Client ID + Secret).</li>
          <li>MongoDB connection string and database name.</li>
          <li>Your preferred voice-cloning/TTS provider API (e.g. ElevenLabs, Kits AI, or custom model).</li>
          <li>Policy decision for copyright/compliance and track availability by region.</li>
          <li>Cloud storage target for generated songs (S3, Cloudflare R2, etc).</li>
        </ul>
      </section>
    </main>
  );
}
