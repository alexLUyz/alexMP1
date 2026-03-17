import { NextRequest, NextResponse } from "next/server";
import { songs } from "@/lib/mockData";

export async function GET(request: NextRequest) {
  const singerId = request.nextUrl.searchParams.get("singerId");
  const filtered = singerId ? songs.filter((song) => song.artistId !== singerId) : songs;

  return NextResponse.json({ data: filtered });
}
