import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

/** Sanity webhook target — fires on every publish/delete so edits made in
 *  /studio go live within seconds instead of waiting for the next deploy.
 *  Configure in manage.sanity.io: URL = this route, header
 *  "x-revalidate-secret" = SANITY_REVALIDATE_SECRET. */
export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-revalidate-secret");
  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ revalidated: false, message: "Invalid secret" }, { status: 401 });
  }

  revalidatePath("/", "layout");

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
