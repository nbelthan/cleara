'use client'

import dynamic from 'next/dynamic'
import Hero from '@/components/Hero'
import Problem from '@/components/Problem'
import Architecture from '@/components/Architecture'
import Metrics from '@/components/Metrics'
import Netting from '@/components/Netting'
import Privacy from '@/components/Privacy'
import Standards from '@/components/Standards'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

const ParticleField = dynamic(() => import('@/components/ParticleField'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-gradient-to-br from-dark-500 via-[#05091A] to-dark-400" />,
})

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-dark-500 text-white">
      <ParticleField />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(100,200,255,0.12),_transparent_65%)]" />
      <div className="relative z-10 flex min-h-screen flex-col">
        <Hero />
        <Problem />
        <Architecture />
        <Metrics />
        <Netting />
        <Privacy />
        <Standards />
        <CTA />
        <Footer />
      </div>
    </main>
  )
}
