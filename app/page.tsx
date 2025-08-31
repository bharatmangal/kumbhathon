import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Nav } from "@/components/nav"
import { Section } from "@/components/section"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Nav />
      <header className="bg-orange-50">
        <div className="mx-auto grid max-w-6xl items-center gap-6 px-4 py-12 md:grid-cols-2">
          <div>
            <h1 className="text-balance text-3xl font-bold leading-tight">
              Smart Mobility & Seva Platform for Simhastha Ujjain 2028
            </h1>
            <p className="mt-2 text-slate-700">
              One app for safe, seamless, and scalable pilgrim movement: amenities, accessible routes, SOS, group
              locator, prasad and camps, transit, donations, and multilingual alerts.
            </p>
            <div className="mt-6 flex gap-3">
              <Link href="/amenities">
                <Button className="bg-orange-600 hover:bg-orange-700">Find Amenities</Button>
              </Link>
              <Link href="/sos">
                <Button
                  variant="outline"
                  className="border-orange-600 text-orange-700 hover:bg-orange-100 bg-transparent"
                >
                  Open SOS
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl ring-1 ring-slate-200">
            <Image src="/images/slide-0001.jpg" alt="Simhastha One 2028" fill priority className="object-cover" />
          </div>
        </div>
      </header>

      <Section title="What challenges we solve" subtitle="From overcrowding to lost groups—here’s how the app helps.">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl ring-1 ring-slate-200">
            <Image src="/images/slide-0002.jpg" alt="Challenges" fill className="object-cover" />
          </div>
          <ul className="space-y-2 text-slate-700">
            <li>• Live amenity locator: water, food, washrooms, stay, lockers, charging</li>
            <li>• SOS + route avoidance for crowded zones and peak days</li>
            <li>• Accessible routes for elderly and divyangjan</li>
            <li>• Group locator and missing person helpdesk workflow</li>
          </ul>
        </div>
      </Section>

      <Section title="All-in-one modules">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <Link key={card.href} href={card.href} className="rounded-xl border p-4 transition hover:shadow-sm">
              <h3 className="font-semibold text-slate-900">{card.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{card.desc}</p>
            </Link>
          ))}
        </div>
      </Section>

      <Section title="Feature snapshots">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl ring-1 ring-slate-200">
            <Image src="/images/slide-0003.jpg" alt="All solutions" fill className="object-cover" />
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl ring-1 ring-slate-200">
            <Image src="/images/slide-0004.jpg" alt="Required features" fill className="object-cover" />
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl ring-1 ring-slate-200">
            <Image src="/images/slide-0005.jpg" alt="Religious features" fill className="object-cover" />
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl ring-1 ring-slate-200">
            <Image src="/images/slide-0006.jpg" alt="Ease of access features" fill className="object-cover" />
          </div>
        </div>
      </Section>

      <footer className="mt-12 border-t">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-600">
          Copyright © 2025 SimhasthaOne. All rights reserved.
        </div>
      </footer>
    </main>
  )
}

const cards = [
  { href: "/amenities", title: "Amenity Locator", desc: "Water, food, washroom, stay, lockers, medical, charging." },
  { href: "/routes", title: "Route Finder", desc: "Safe, accessible routes with crowd-aware avoidance." },
  { href: "/sos", title: "Emergency SOS", desc: "Panic button with location + helplines." },
  { href: "/missing", title: "Group Locator", desc: "Create group code, share location, reunite quickly." },
  { href: "/religious", title: "Religious & Seva", desc: "Prasad/water stores, camps/ghats/puja sthal, donations." },
  { href: "/transit", title: "Transit & Parking", desc: "Parking, shuttle pickup/drop points, vehicle finder." },
  { href: "/info", title: "Broadcast & Multilingual", desc: "City alerts and guidance in Hindi/English." },
  { href: "/donate", title: "Digital Donation", desc: "Simple pledge flow and donation info." },
]
