import { NextResponse } from "next/server"

export async function GET() {
  const items = [
    {
      at: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
      en: "Shuttle S1 frequency increased to every 5 minutes.",
      hi: "शटल S1 की आवृत्ति अब हर 5 मिनट पर है।",
    },
    {
      at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      en: "Avoid Ram Ghat east entry 6–10 AM due to crowd.",
      hi: "भीड़ के कारण 6–10 बजे तक राम घाट पूर्व प्रवेश से बचें।",
    },
    {
      at: new Date(Date.now() - 1000 * 60 * 55).toISOString(),
      en: "Free water kiosks active at Sector A and Bridge.",
      hi: "सेक्टर A और ब्रिज पर निःशुल्क जल कियोस्क चालू हैं।",
    },
  ]
  return NextResponse.json({ items })
}
