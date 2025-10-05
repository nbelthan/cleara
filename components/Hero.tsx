'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const heroStats = [
  {
    value: '1-3s',
    label: 'Deterministic Finality',
    detail: 'Consensus-locked BFT completion with zero reversal risk.',
  },
  {
    value: '20×',
    label: 'Netting Compression',
    detail: 'Multilateral compression baked into ordering and settlement.',
  },
  {
    value: 'HPKE',
    label: 'Encrypted Identity',
    detail: 'Pseudonymous on-chain, selective off-chain disclosure.',
  },
]

export default function Hero() {
  return (
    <header className="relative flex min-h-screen flex-col justify-between px-6 pb-24 pt-16 sm:px-10 lg:px-24">
      <motion.nav
        className="pointer-events-auto relative z-10 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-xl"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#64c8ff] via-[#ab7bff] to-[#64c8ff] shadow-[0_0_30px_rgba(100,200,255,0.35)]" />
          <div className="text-lg font-semibold tracking-[0.35em] text-white/90">CLEΛRA</div>
        </div>
        <div className="hidden items-center gap-6 text-sm uppercase tracking-[0.3em] text-white/60 md:flex">
          <span className="transition-colors hover:text-white">Technology</span>
          <span className="transition-colors hover:text-white">Netting</span>
          <span className="transition-colors hover:text-white">Privacy</span>
          <span className="transition-colors hover:text-white">Request Access</span>
        </div>
        <Link
          href="/whitepaper"
          className="pointer-events-auto rounded-full border border-white/15 px-5 py-2 text-sm font-medium uppercase tracking-[0.2em] text-white/70 transition hover:border-white/40 hover:text-white"
        >
          Whitepaper
        </Link>
      </motion.nav>

      <div className="relative z-10 mt-16 flex flex-col gap-20 lg:flex-row lg:items-end">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <motion.h1
            className="text-balance text-5xl font-semibold leading-tight text-white/95 sm:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1, ease: 'easeOut' }}
          >
            The settlement layer engineered for stablecoins, banks, and cross-border precision.
          </motion.h1>
          <motion.p
            className="mt-6 max-w-2xl text-lg text-white/70 sm:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.9, ease: 'easeOut' }}
          >
            ISO&nbsp;20022 native from the kernel up. Consensus-integrated multilateral netting. HPKE-encrypted identity envelopes. Cleara turns slow correspondent flows into instant, provable settlement.
          </motion.p>

          <motion.div
            className="pointer-events-auto mt-10 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
          >
            <button className="relative overflow-hidden rounded-full border border-white/20 bg-white/10 px-8 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-white shadow-[0_0_30px_rgba(100,200,255,0.25)] transition hover:border-white/40 hover:shadow-[0_0_50px_rgba(100,200,255,0.45)]">
              <span className="relative z-10">Request Access</span>
              <span className="absolute inset-0 h-full w-full bg-[conic-gradient(from_90deg,_rgba(100,200,255,0.05),_rgba(171,123,255,0.15),_rgba(100,200,255,0.05))] blur-xl" />
            </button>
            <Link
              href="/whitepaper"
              className="rounded-full border border-white/15 px-7 py-3 text-sm font-medium uppercase tracking-[0.3em] text-white/70 transition hover:border-white/45 hover:text-white"
            >
              Read Whitepaper
            </Link>
            <Link
              href="#cta"
              className="rounded-full border border-white/10 px-7 py-3 text-sm font-medium uppercase tracking-[0.3em] text-white/60 transition hover:border-white/35 hover:text-white"
            >
              Join Waitlist
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="pointer-events-auto flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl lg:ml-auto lg:w-[420px]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
        >
          <div className="mb-4 text-sm uppercase tracking-[0.5em] text-white/50">Signal, not noise</div>
          <div className="flex flex-col gap-6">
            {heroStats.map((stat) => (
              <motion.div
                key={stat.label}
                className="group rounded-2xl border border-white/5 bg-white/10 p-4 transition hover:border-white/15 hover:bg-white/15"
                whileHover={{ y: -6 }}
              >
                <div className="flex items-center justify-between text-sm uppercase tracking-[0.4em] text-white/50">
                  <span>{stat.label}</span>
                  <span className="text-white/40">●</span>
                </div>
                <div className="mt-3 text-3xl font-semibold text-white/90">{stat.value}</div>
                <p className="mt-2 text-sm text-white/70">{stat.detail}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        className="pointer-events-none absolute bottom-12 left-1/2 hidden h-24 w-px -translate-x-1/2 overflow-hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <span className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-transparent animate-[scroll-bounce_2.5s_ease-in-out_infinite]" />
      </motion.div>
    </header>
  )
}
