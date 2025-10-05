'use client'

import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

const pillars = [
  {
    icon: 'encrypted',
    title: 'Encrypted End-to-End',
    points: [
      'HPKE envelopes wrap ISO 20022 payloads.',
      'Multi-recipient key slots for regulators.',
      'No PII ever lands on-chain.',
    ],
  },
  {
    icon: 'regulator',
    title: 'Regulator Ready',
    points: [
      'Travel Rule metadata embedded in envelopes.',
      'Selective disclosure with audit keys.',
      'Retention controls satisfy GDPR Article 17.',
    ],
  },
  {
    icon: 'transparency',
    title: 'Selective Transparency',
    points: [
      'Pseudonymous settlement kernels visible to all.',
      'Traceability without leaking counterparties.',
      'Evidence-grade logs for dispute resolution.',
    ],
  },
]

const iconWrapper =
  'relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/12 bg-gradient-to-br from-white/15 via-white/10 to-white/5 shadow-[0_0_24px_rgba(100,200,255,0.18)]'

function LockIcon() {
  return (
    <div className={iconWrapper}>
      <div className="absolute -top-1 h-3.5 w-[1.3rem] rounded-full border border-white/30 bg-transparent" />
      <div className="relative h-5 w-6 rounded-md border border-white/25 bg-white/20" />
    </div>
  )
}

function PillarIcon() {
  return (
    <div className={iconWrapper}>
      <div className="flex h-7 w-8 items-end justify-between">
        <div className="h-full w-2 rounded-full bg-white/30" />
        <div className="h-5 w-2 rounded-full bg-white/40" />
        <div className="h-full w-2 rounded-full bg-white/30" />
      </div>
      <div className="absolute -top-2 h-1 w-8 rounded-full bg-white/25" />
    </div>
  )
}

function LayersIcon() {
  return (
    <div className={iconWrapper}>
      <div className="relative flex flex-col gap-1">
        <div className="h-2.5 w-7 rounded-md border border-white/25 bg-white/20" />
        <div className="h-2.5 w-6 rounded-md border border-white/20 bg-white/15" />
        <div className="h-2.5 w-5 rounded-md border border-white/15 bg-white/10" />
      </div>
    </div>
  )
}

const iconMap: Record<string, ReactNode> = {
  encrypted: <LockIcon />,
  regulator: <PillarIcon />,
  transparency: <LayersIcon />,
}

export default function Privacy() {
  return (
    <section className="px-6 py-24 sm:px-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <p className="text-sm uppercase tracking-[0.5em] text-white/50">Privacy that regulators accept</p>
          <h2 className="mt-4 text-4xl font-semibold text-white/95 sm:text-5xl">
            Identity stays encrypted. Compliance stays instant.
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base text-white/70 sm:text-lg">
            The Cleara stack treats privacy and compliance as the same requirement. HPKE-protected envelopes carry the context banks need, while the chain anchors immutable proofs.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur-2xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: index * 0.1 }}
              whileHover={{ y: -6 }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.1),transparent_55%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,rgba(100,200,255,0.12),transparent_55%)]" />
              <div className="relative flex flex-col gap-5">
                <div className="flex items-center gap-4">
                  {iconMap[pillar.icon]}
                  <div className="text-lg font-semibold text-white/90">{pillar.title}</div>
                </div>
                <ul className="space-y-3 text-sm text-white/70">
                  {pillar.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-[#64c8ff] shadow-[0_0_12px_rgba(100,200,255,0.8)]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
