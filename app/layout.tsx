import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SimhasthaOne App',
  description: 'One App for Simhastha 2028',
  generator: 'bharatmangal',
  icons: {
    icon: '/placeholder-logo.png',
    apple: '/placeholder-logo.png',
  },
  openGraph: {
    title: 'SimhasthaOne App',
    description: 'One App for Simhastha 2028',
    url: 'https://simhastha-one.vercel.app', // Replace with your actual domain
    siteName: 'SimhasthaOne',
    images: [
      {
        url: '/images/kumbh-0001.jpg',
        width: 1200,
        height: 630,
        alt: 'Simhastha Kumbh Mela',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SimhasthaOne App',
    description: 'One App for Simhastha 2028',
    images: ['/images/kumbh-0001.jpg'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/placeholder-logo.png" type="image/png" />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
