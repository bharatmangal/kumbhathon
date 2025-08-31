"use client"

import useSWR from "swr"
import { Nav } from "@/components/nav"

const fetcher = (u: string) => fetch(u).then((r) => r.json())

export default function ReligiousPage() {
  const { data } = useSWR("/api/amenities", fetcher)
  const stores = (data?.items || []).filter((i: any) => i.type === "food" || i.type === "water")

  return (
    <main className="min-h-screen bg-white">
      <Nav />
      <div className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-2xl font-semibold">Religious Services & Seva</h1>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border p-4">
            <h2 className="font-medium">Prasad & Kumbh Water Stores</h2>
            <ul className="mt-2 space-y-2 text-sm">
              {stores.slice(0, 8).map((s: any) => (
                <li key={s.id} className="rounded border p-2">
                  <div className="font-medium">{s.name}</div>
                  <div className="text-slate-600 capitalize">{s.type}</div>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border p-4">
            <h2 className="font-medium">Camps, Ghats & Puja Sthals</h2>
            <ul className="mt-2 list-disc pl-6 text-sm text-slate-700">
              <li>Naga Sadhus Camp Zone A</li>
              <li>Ram Ghat, Shipra riverfront</li>
              <li>Mahakal Corridor Puja Stalls</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 rounded-xl border p-4">
          <h2 className="font-medium">Digital Donations</h2>
          <p className="text-sm text-slate-600">
            Find verified donation windows for temple trusts and seva initiatives.
          </p>
          <ul className="mt-2 list-disc pl-6 text-sm text-blue-700">
            <li>Mahakaleshwar Temple Trust</li>
            <li>River Cleanliness Seva</li>
            <li>Langar/Annadaan Committees</li>
          </ul>
        </div>
      </div>
    </main>
  )
}
