import { fetchGitHubStats } from "@/lib/github-api";
import { NextResponse } from "next/server";

export async function GET() {
  const stats = await fetchGitHubStats();

  if (!stats) {
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }

  return NextResponse.json(stats);
}
