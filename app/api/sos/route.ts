import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  // In production: persist to DB and notify responders
  return NextResponse.json({ ok: true, received: body })
}
