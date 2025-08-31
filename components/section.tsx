import type { ReactNode } from "react"

export function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <h2 className="text-pretty text-2xl font-semibold text-slate-900">{title}</h2>
      {subtitle ? <p className="mt-1 text-slate-600">{subtitle}</p> : null}
      <div className="mt-6">{children}</div>
    </section>
  )
}
