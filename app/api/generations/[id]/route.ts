import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } },
) {
  if (!ObjectId.isValid(params.id)) {
    return NextResponse.json({ error: "Invalid generation id" }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB ?? "voice_remix");

  const doc = await db
    .collection("generations")
    .findOne({ _id: new ObjectId(params.id) });

  if (!doc) {
    return NextResponse.json({ error: "Generation not found" }, { status: 404 });
  }

  return NextResponse.json({
    id: doc._id.toString(),
    status: doc.status,
    outputUrl: doc.outputUrl,
    singerId: doc.singerId,
    songId: doc.songId,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  });
}
