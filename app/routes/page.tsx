"use client"

import useSWR from "swr"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Nav } from "@/components/nav"

const fetcher = (u: string) => fetch(u).then((r) => r.json())

const places = [
  { id: "railway", name: "Ujjain Jn. Railway Station" },
  { id: "bus", name: "ISBT Bus Stand" },
  { id: "ramghat", name: "Ram Ghat" },
  { id: "mahakal", name: "Mahakaleshwar Temple" },
  { id: "parking-p1", name: "Parking P1" },
]

export default function RoutesPage() {
  const [from, setFrom] = useState("railway")
  const [to, setTo] = useState("ramghat")
  const [accessible, setAccessible] = useState(false)
  const { data, isLoading } = useSWR(`/api/routes?from=${from}&to=${to}&accessible=${accessible}`, fetcher)

  return (
    <main className="min-h-screen bg-white">
      <Nav />
      <div className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="text-2xl font-semibold">Route Finder</h1>
        <p className="text-slate-600">Find safe and accessible routes. Use shuttles where suggested.</p>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <Select value={from} onValueChange={setFrom}>
            <SelectTrigger>
              <SelectValue placeholder="From" />
            </SelectTrigger>
            <SelectContent>
              {places.map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={to} onValueChange={setTo}>
            <SelectTrigger>
              <SelectValue placeholder="To" />
            </SelectTrigger>
            <SelectContent>
              {places.map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant={accessible ? "default" : "outline"}
            className={
              accessible ? "bg-orange-600 hover:bg-orange-700" : "border-orange-600 text-orange-700 hover:bg-orange-50"
            }
            onClick={() => setAccessible((v) => !v)}
          >
            {accessible ? "Accessible: On" : "Accessible: Off"}
          </Button>
        </div>

        <div className="mt-6 rounded-xl border p-4">
          {isLoading ? (
            <p>Loading route...</p>
          ) : (
            <>
              <h2 className="font-medium">Suggested Route</h2>
              <ol className="mt-2 list-decimal pl-6 text-sm text-slate-700">
                {(data?.steps ?? []).map((s: any, i: number) => (
                  <li key={i}>{s}</li>
                ))}
              </ol>
              <p className="mt-2 text-sm text-blue-700">{data?.advice}</p>
            </>
          )}
        </div>
      </div>
    </main>
  )
}
