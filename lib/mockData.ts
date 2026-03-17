import { Singer, Song } from "@/lib/types";

export const singers: Singer[] = [
  { id: "s1", name: "Arijit Singh", spotifyArtistId: "4YRxDV8wJFPHPTeXepOstw" },
  { id: "s2", name: "Shreya Ghoshal", spotifyArtistId: "0oOet2f43PA68X5RxKobEy" },
  { id: "s3", name: "Sonu Nigam", spotifyArtistId: "4LqM8cQn8sP6x6U36v9WJh" },
];

export const songs: Song[] = [
  {
    id: "t1",
    title: "Tum Hi Ho",
    spotifyTrackId: "56zZ48jdyY2oDXHVnwg5Di",
    artistId: "s1",
    artistName: "Arijit Singh",
  },
  {
    id: "t2",
    title: "Deewani Mastani",
    spotifyTrackId: "2K4f8fUeD9YH6eQmA4l1q2",
    artistId: "s2",
    artistName: "Shreya Ghoshal",
  },
  {
    id: "t3",
    title: "Abhi Mujh Mein Kahin",
    spotifyTrackId: "0A8lQteL4HjMf9fD6rJHUp",
    artistId: "s3",
    artistName: "Sonu Nigam",
  },
  {
    id: "t4",
    title: "Kesariya",
    spotifyTrackId: "6VBhH7CyP56BXjp8VsDFPZ",
    artistId: "s1",
    artistName: "Arijit Singh",
  },
];
