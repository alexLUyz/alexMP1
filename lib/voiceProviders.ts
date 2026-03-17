export type VoiceProvider = {
  id: string;
  name: string;
  bestFor: string;
  website: string;
  notes: string;
};

export const voiceProviders: VoiceProvider[] = [
  {
    id: "elevenlabs",
    name: "ElevenLabs",
    bestFor: "Fast API onboarding and high-quality voice conversion",
    website: "https://elevenlabs.io",
    notes: "Great docs + SDKs; pricing can increase quickly at scale.",
  },
  {
    id: "kitsai",
    name: "Kits AI",
    bestFor: "Singing voice conversion workflows",
    website: "https://www.kits.ai",
    notes: "Strong music-focused tooling and creator workflows.",
  },
  {
    id: "voicify",
    name: "Voicify AI",
    bestFor: "Template-style voice covers and creator features",
    website: "https://voicify.ai",
    notes: "Useful for rapid prototypes; verify API + commercial terms.",
  },
  {
    id: "selfhosted",
    name: "Self-hosted (RVC / So-VITS-SVC)",
    bestFor: "Maximum control and custom model pipelines",
    website: "https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI",
    notes: "Best flexibility; higher engineering/ops burden.",
  },
];
