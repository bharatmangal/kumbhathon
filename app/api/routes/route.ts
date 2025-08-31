import { type NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const accessible = url.searchParams.get("accessible") === "true"
  const from = url.searchParams.get("from")
  const to = url.searchParams.get("to")
  const steps = accessible
    ? [
        "Use accessible gate with ramp",
        "Board low-floor shuttle at Bay S2",
        "Alight at Ram Ghat accessible stop",
        "Follow tactile path to riverfront",
      ]
    : ["Walk to nearest corridor", "Take foot overbridge to main route", "Proceed via crowd-managed lane"]
  const advice = accessible
    ? "Avoid steep ghats; use ramped access points and shuttle transfers."
    : "Avoid peak 6–10 AM; follow signage and police instructions."
  return NextResponse.json({ from, to, accessible, steps, advice })
}
