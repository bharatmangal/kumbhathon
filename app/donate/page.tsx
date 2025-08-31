"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Nav } from "@/components/nav"

export default function DonatePage() {
  const [amount, setAmount] = useState("500")
  const [to, setTo] = useState("Mahakaleshwar Temple Trust")
  const [msg, setMsg] = useState("")

  function submit() {
    setMsg(`Pledge recorded: ₹${amount} to ${to}. You will be redirected to a verified payment page in production.`)
  }

  return (
    <main className="min-h-screen bg-white">
      <Nav />
      <div className="mx-auto max-w-md px-4 py-8">
        <h1 className="text-2xl font-semibold">Digital Donation Window</h1>
        <div className="mt-4 space-y-3 rounded-xl border p-4">
          <label className="block text-sm">Beneficiary</label>
          <select value={to} onChange={(e) => setTo(e.target.value)} className="w-full rounded-md border p-2">
            <option>Mahakaleshwar Temple Trust</option>
            <option>River Cleanliness Seva</option>
            <option>Langar/Annadaan Committee</option>
          </select>

          <label className="mt-3 block text-sm">Amount (₹)</label>
          <Input value={amount} onChange={(e) => setAmount(e.target.value)} />

          <Button onClick={submit} className="mt-4 w-full bg-orange-600 hover:bg-orange-700">
            Pledge
          </Button>
          {msg ? <p className="text-sm text-blue-700">{msg}</p> : null}
        </div>
      </div>
    </main>
  )
}
