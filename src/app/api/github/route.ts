import { NextResponse } from "next/server";
import { getGitHubActivityService } from "@/server/container";

export const revalidate = 3600;

export async function GET() {
  const activity = await getGitHubActivityService().getActivity();

  if (!activity) {
    return NextResponse.json(
      { error: "GitHub activity is temporarily unavailable." },
      { status: 503 }
    );
  }

  return NextResponse.json(activity);
}
