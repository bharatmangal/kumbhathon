"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Nav } from "@/components/nav"

export default function SOSPage() {
  const [status, setStatus] = useState<string>("")

  async function sendSOS() {
    setStatus("Sending location...")
    let lat: number | null = null
    let lon: number | null = null
    try {
      const pos = await new Promise<GeolocationPosition>((res, rej) =>
        navigator.geolocation.getCurrentPosition(res, rej, { enableHighAccuracy: true, timeout: 10000 }),
      )
      lat = pos.coords.latitude
      lon = pos.coords.longitude
    } catch {}
    const res = await fetch("/api/sos", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ lat, lon, at: new Date().toISOString() }),
    })
    if (res.ok) setStatus("SOS sent. Stay put and call helpline if needed.")
    else setStatus("Could not send SOS. Try again or use helpline.")
  }

  return (
    <main className="min-h-screen bg-white">
      <Nav />
      <div className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="text-2xl font-semibold">Emergency Assistance</h1>
        <p className="text-slate-600">Panic button, key helplines, and crowd-aware guidance.</p>

        <div className="mt-6 rounded-xl border bg-orange-50 p-6 text-center">
          <Button onClick={sendSOS} className="h-24 w-full max-w-md bg-orange-600 text-xl hover:bg-orange-700">
            PANIC / SOS
          </Button>
          <p className="mt-3 text-sm text-slate-700">{status}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <Helpline label="Police" phone="100" />
            <Helpline label="Ambulance" phone="108" />
            <Helpline label="Women Helpline" phone="1091" />
          </div>
        </div>

        <div className="mt-8 rounded-xl border p-4">
          <h2 className="font-medium">Route Avoidance (Advisory)</h2>
          <p className="text-sm text-slate-600">
            On peak hours, certain corridors may be restricted. Follow signage and app advisories.
          </p>
          <ul className="mt-2 list-disc pl-6 text-sm text-blue-700">
            <li>Ram Ghat → Kshipra Bridge: avoid 6–10 AM on Shahi Snan</li>
            <li>Shipra Riverfront access staggered; use shuttle bays S1, S2</li>
          </ul>
        </div>
      </div>
    </main>
  )
}

function Helpline({ label, phone }: { label: string; phone: string }) {
  return (
    <a href={`tel:${phone}`} className="block rounded-lg border bg-white p-4 text-center hover:shadow-sm">
      <div className="font-medium">{label}</div>
      <div className="text-slate-700">{phone}</div>
    </a>
  )
}
