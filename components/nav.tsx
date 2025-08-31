"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const links = [
  { href: "/", label: "Home" },
  { href: "/amenities", label: "Amenities" },
  { href: "/routes", label: "Routes" },
  { href: "/sos", label: "SOS" },
  { href: "/missing", label: "Group" },
  { href: "/religious", label: "Religious" },
  { href: "/transit", label: "Transit" },
  { href: "/info", label: "Info" },
  { href: "/donate", label: "Donate" },
]

export function Nav() {
  const pathname = usePathname()
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-orange-600 text-white font-bold">
            ॐ
          </span>
          <span className="font-semibold">Simhastha One · Ujjain 2028</span>
        </Link>
        <nav className="hidden md:flex items-center gap-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "text-sm px-2 py-1 rounded-md",
                pathname === l.href ? "bg-orange-50 text-orange-700" : "text-slate-700 hover:text-orange-700",
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
