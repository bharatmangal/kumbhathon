"use client"

import useSWR from "swr"
import { useEffect, useMemo, useState } from "react"
import { distanceMeters } from "@/lib/geo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Nav } from "@/components/nav"

type Amenity = {
  id: string
  name: string
  type: "water" | "food" | "washroom" | "stay" | "locker" | "medical" | "charging"
  lat: number
  lon: number
  open24?: boolean
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function AmenitiesPage() {
  const { data } = useSWR<{ items: Amenity[] }>("/api/amenities", fetcher)
  const [q, setQ] = useState("")
  const [type, setType] = useState<string>("all")
  const [pos, setPos] = useState<{ lat: number; lon: number } | null>(null)

  useEffect(() => {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(
      (p) => setPos({ lat: p.coords.latitude, lon: p.coords.longitude }),
      () => setPos(null),
      { enableHighAccuracy: true, maximumAge: 20000, timeout: 10000 },
    )
  }, [])

  const items = useMemo(() => {
    const list = data?.items ?? []
    const filtered = list.filter(
      (i) => (type === "all" || i.type === type) && (q.length < 2 || i.name.toLowerCase().includes(q.toLowerCase())),
    )
    if (pos) {
      return filtered
        .map((i) => ({ ...i, dist: distanceMeters(pos, { lat: i.lat, lon: i.lon }) }))
        .sort((a, b) => (a as any).dist - (b as any).dist)
    }
    return filtered
  }, [data, q, type, pos])

  return (
    <main className="min-h-screen bg-white">
      <Nav />
      <div className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="text-2xl font-semibold">Amenity Locator</h1>
        <p className="text-slate-600">Water • Food • Washroom • Stay • Lockers • Medical • Charging</p>

        <div className="mt-4 flex flex-wrap gap-3">
          <Input
            placeholder="Search name (min 2 chars)"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="max-w-sm"
          />
          <div className="flex flex-wrap gap-2">
            {["all", "water", "food", "washroom", "stay", "locker", "medical", "charging"].map((t) => (
              <Button
                key={t}
                variant={type === t ? "default" : "outline"}
                className={
                  type === t
                    ? "bg-orange-600 hover:bg-orange-700"
                    : "border-orange-600 text-orange-700 hover:bg-orange-50"
                }
                onClick={() => setType(t)}
              >
                {t}
              </Button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border p-4">
            <div className="aspect-[16/10] w-full overflow-hidden rounded-lg bg-slate-100">
              {/* Map placeholder; hook up MapLibre/Leaflet later */}
              <img
                src={`/placeholder.svg?height=300&width=600&query=Ujjain%20map%20placeholder`}
                alt="Map placeholder"
                className="h-full w-full object-cover"
              />
            </div>
            <p className="mt-2 text-sm text-slate-600">
              Enable location for nearest results. Map can be upgraded to MapLibre/OpenStreetMap later.
            </p>
          </div>

          <ul className="divide-y rounded-xl border">
            {items.map((i: any) => (
              <li key={i.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{i.name}</div>
                    <div className="text-sm text-slate-600 capitalize">
                      {i.type} • {i.open24 ? "Open 24x7" : "Timings apply"}
                    </div>
                    {i?.dist != null ? (
                      <div className="text-sm text-blue-600">{(i.dist / 1000).toFixed(2)} km away</div>
                    ) : null}
                  </div>
                  <a
                    className="text-sm text-orange-700 underline"
                    target="_blank"
                    href={`https://www.google.com/maps/dir/?api=1&destination=${i.lat},${i.lon}`}
                    rel="noreferrer"
                  >
                    Navigate
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  )
}
