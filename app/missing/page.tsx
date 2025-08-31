"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Nav } from "@/components/nav"

function generateCode() {
  return Math.random().toString(36).slice(2, 8).toUpperCase()
}

export default function GroupPage() {
  const [group, setGroup] = useState<string>("")
  const [notice, setNotice] = useState<string>("")
  const [last, setLast] = useState<any>(null)

  useEffect(() => {
    const g = new URLSearchParams(window.location.search).get("group")
    const saved = localStorage.getItem("simhastha_group")
    const code = g || saved || ""
    setGroup(code)
    if (!saved && code) localStorage.setItem("simhastha_group", code)

    // Load last check-in
    if (code) {
      const k = localStorage.getItem(`simhastha_checkin_${code}`)
      if (k) setLast(JSON.parse(k))
    }
  }, [])

  function createGroup() {
    const code = generateCode()
    setGroup(code)
    localStorage.setItem("simhastha_group", code)
    setLast(null) // reset last check-in
  }

  function share() {
    const url = `${window.location.origin}/missing?group=${group}`
    navigator.clipboard.writeText(url)
    setNotice("Link copied. Share with your family to join this group.")
    if ((navigator as any).share) {
      ;(navigator as any).share({ title: "Join my Kumbh group", text: "Open to share live check-ins", url })
    }
  }

  async function checkIn() {
    let lat: number | null = null,
      lon: number | null = null
    try {
      const pos = await new Promise<GeolocationPosition>((res, rej) =>
        navigator.geolocation.getCurrentPosition(res, rej, { enableHighAccuracy: true, timeout: 10000 }),
      )
      lat = pos.coords.latitude
      lon = pos.coords.longitude
    } catch {}

    const entry = { lat, lon, at: new Date().toISOString() }
    localStorage.setItem(`simhastha_checkin_${group}`, JSON.stringify(entry))
    setLast(entry)
    setNotice("Checked in. Group members can view your last location.")
  }

  return (
    <main className="min-h-screen bg-white">
      <Nav />
      <div className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="text-2xl font-semibold">Group Locator & Missing Person Aid</h1>
        <p className="text-slate-600">
          Create a group code, share with family, and check-in to share your last location.
        </p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border p-4">
            <div className="flex items-center gap-3">
              <Input value={group} onChange={(e) => setGroup(e.target.value.toUpperCase())} placeholder="Group code" />
              <Button onClick={createGroup} className="bg-orange-600 hover:bg-orange-700">
                New
              </Button>
            </div>
            <div className="mt-3 flex gap-2">
              <Button
                variant="outline"
                className="border-orange-600 text-orange-700 hover:bg-orange-50 bg-transparent"
                onClick={share}
                disabled={!group}
              >
                Share Link
              </Button>
              <Button variant="outline" onClick={checkIn} disabled={!group}>
                Check-in
              </Button>
            </div>
            <p className="mt-2 text-sm text-blue-700">{notice}</p>
          </div>

          <div className="rounded-xl border p-4">
            <h2 className="font-medium">Last Check-in</h2>
            <p className="text-sm text-slate-600">
              Demo stores data locally. Connect to secure backend for production.
            </p>
            <div className="mt-2 rounded border p-2 text-sm">
              {last
                ? `You @ ${last.lat?.toFixed?.(4)}, ${last.lon?.toFixed?.(4)} • ${new Date(last.at).toLocaleTimeString()}`
                : "No check-in yet."}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
