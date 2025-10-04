import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Cleara — Deterministic ISO 20022 Settlement',
  description:
    'Cleara delivers 1-3s finality, consensus-native multilateral netting, and HPKE-encrypted identity envelopes for institutional stablecoin settlement.',
  openGraph: {
    title: 'Cleara — Deterministic ISO 20022 Settlement',
    description:
      'Instant cross-border settlement with deterministic netting and regulator-grade privacy.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
