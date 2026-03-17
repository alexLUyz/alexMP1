export type Singer = {
  id: string;
  name: string;
  spotifyArtistId: string;
};

export type Song = {
  id: string;
  title: string;
  spotifyTrackId: string;
  artistId: string;
  artistName: string;
  previewUrl?: string | null;
};

export type GenerationStatus = "queued" | "processing" | "completed" | "failed";

export type VoiceGeneration = {
  id: string;
  singerId: string;
  songId: string;
  status: GenerationStatus;
  outputUrl?: string;
  createdAt: string;
  updatedAt: string;
};
