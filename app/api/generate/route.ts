import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { songs } from "@/lib/mockData";

export async function POST(request: NextRequest) {
  const { singerId, songId } = (await request.json()) as {
    singerId?: string;
    songId?: string;
  };

  if (!singerId || !songId) {
    return NextResponse.json({ error: "singerId and songId are required" }, { status: 400 });
  }

  const song = songs.find((item) => item.id === songId);
  if (!song) {
    return NextResponse.json({ error: "Song not found" }, { status: 404 });
  }

  if (song.artistId === singerId) {
    return NextResponse.json(
      { error: "Selected song already belongs to selected singer" },
      { status: 400 },
    );
  }

  const now = new Date();
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB ?? "voice_remix");

  const result = await db.collection("generations").insertOne({
    singerId,
    songId,
    status: "processing",
    createdAt: now,
    updatedAt: now,
    outputUrl: null,
  });

  setTimeout(async () => {
    const finishedAt = new Date();
    await db.collection("generations").updateOne(
      { _id: result.insertedId },
      {
        $set: {
          status: "completed",
          outputUrl:
            "https://cdn.pixabay.com/download/audio/2022/03/15/audio_5f6f5f0fbe.mp3?filename=summer-upbeat-loop-110497.mp3",
          updatedAt: finishedAt,
        },
      },
    );
  }, 4000);

  return NextResponse.json({ id: result.insertedId.toString(), status: "processing" }, { status: 202 });
}
