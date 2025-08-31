import { NextResponse } from "next/server"

export async function GET() {
  const items = [
    { id: "w1", name: "Water Kiosk - Ram Ghat", type: "water", lat: 23.1823, lon: 75.7801, open24: true },
    { id: "f1", name: "Langar Point - Sector A", type: "food", lat: 23.183, lon: 75.783 },
    { id: "wr1", name: "Public Washroom - S2", type: "washroom", lat: 23.186, lon: 75.779, open24: true },
    { id: "st1", name: "Dharamshala Stay - Zone B", type: "stay", lat: 23.191, lon: 75.773 },
    { id: "lk1", name: "Locker Room - Gate 3", type: "locker", lat: 23.188, lon: 75.778 },
    { id: "md1", name: "Medical Aid Center - ISBT", type: "medical", lat: 23.197, lon: 75.778, open24: true },
    { id: "ch1", name: "Charging Station - Corridor East", type: "charging", lat: 23.195, lon: 75.782 },
    { id: "f2", name: "Prasad Store - Mahakal", type: "food", lat: 23.176, lon: 75.784 },
    { id: "w2", name: "Kumbh Jal Stall - Bridge", type: "water", lat: 23.189, lon: 75.786 },
  ]
  return NextResponse.json({ items })
}
