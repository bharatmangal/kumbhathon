"use client"

import useSWR from "swr"
import { useState } from "react"
import { Nav } from "@/components/nav"

const fetcher = (u: string) => fetch(u).then((r) => r.json())

export default function InfoPage() {
  const [lang, setLang] = useState<"en" | "hi">("en")
  const { data } = useSWR("/api/announcements", fetcher)
  const items = (data?.items || []).map((i: any) => ({ at: i.at, text: i[lang] }))

  return (
    <main className="min-h-screen bg-white">
      <Nav />
      <div className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="text-2xl font-semibold">City Broadcasts</h1>
        <div className="mt-3 flex gap-2">
          <button
            onClick={() => setLang("en")}
            className={`rounded-md border px-3 py-1 ${lang === "en" ? "bg-orange-600 text-white" : ""}`}
          >
            English
          </button>
          <button
            onClick={() => setLang("hi")}
            className={`rounded-md border px-3 py-1 ${lang === "hi" ? "bg-orange-600 text-white" : ""}`}
          >
            हिन्दी
          </button>
        </div>
        <ul className="mt-4 space-y-3">
          {items.map((a: any, i: number) => (
            <li key={i} className="rounded-xl border p-3">
              <div className="text-xs text-slate-500">{new Date(a.at).toLocaleString()}</div>
              <div className="mt-1 text-sm">{a.text}</div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
