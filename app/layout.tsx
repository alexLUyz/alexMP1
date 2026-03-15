import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Voice Remix Studio",
  description: "Generate songs in a selected singer voice using Spotify catalog",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
