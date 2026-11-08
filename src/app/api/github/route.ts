import { NextResponse } from "next/server";
import { GITHUB_CONFIG } from "@/config/github";
import { getGitHubStats } from "@/lib/github-route-handler";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const stats = await getGitHubStats(GITHUB_CONFIG.token);
    return NextResponse.json(stats);
  } catch (error) {
    // The service layer should handle logging, but we can log here too if needed
    console.error("API route error:", error);
    return NextResponse.json(
      { error: "Failed to fetch GitHub data" },
      { status: 500 }
    );
  }
}
