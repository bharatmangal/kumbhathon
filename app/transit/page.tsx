"use client"

import useSWR from "swr"
import { Nav } from "@/components/nav"

const fetcher = (u: string) => fetch(u).then((r) => r.json())

export default function TransitPage() {
  const { data } = useSWR("/api/amenities", fetcher)
  const charging = (data?.items || []).filter((i: any) => i.type === "charging")
  const parking = [
    { id: "P1", name: "Parking P1 - North Ujjain", capacity: "1200" },
    { id: "P2", name: "Parking P2 - Near ISBT", capacity: "900" },
  ]
  const shuttles = [
    { id: "S1", name: "Shuttle Bay S1 - ISBT", routes: "S1 ↔ Ram Ghat" },
    { id: "S2", name: "Shuttle Bay S2 - Railway", routes: "S2 ↔ Mahakal" },
  ]

  return (
    <main className="min-h-screen bg-white">
      <Nav />
      <div className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-2xl font-semibold">Transit, Parking & Charging</h1>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border p-4">
            <h2 className="font-medium">Parking Lots</h2>
            <ul className="mt-2 space-y-2 text-sm">
              {parking.map((p) => (
                <li key={p.id} className="rounded border p-2">
                  {p.name} • Capacity {p.capacity}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border p-4">
            <h2 className="font-medium">Shuttle Pickup & Drop</h2>
            <ul className="mt-2 space-y-2 text-sm">
              {shuttles.map((s) => (
                <li key={s.id} className="rounded border p-2">
                  {s.name} • {s.routes}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border p-4">
            <h2 className="font-medium">Charging Points</h2>
            <ul className="mt-2 space-y-2 text-sm">
              {charging.map((c: any) => (
                <li key={c.id} className="rounded border p-2">
                  {c.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border p-4">
            <h2 className="font-medium">Vehicle Finder</h2>
            <p className="text-sm text-slate-600">Mark your parking slot and find it later.</p>
            <VehicleFinder />
          </div>
        </div>
      </div>
    </main>
  )
}

function VehicleFinder() {
  function save() {
    localStorage.setItem("vehicle_mark", new Date().toISOString())
    alert("Marked your vehicle location time.")
  }
  return (
    <div className="mt-2 flex gap-2">
      <button onClick={save} className="rounded-md border bg-orange-600 px-3 py-2 text-white">
        Mark Now
      </button>
      <button
        onClick={() => alert(localStorage.getItem("vehicle_mark") || "No mark yet")}
        className="rounded-md border px-3 py-2"
      >
        Show Mark
      </button>
    </div>
  )
}
