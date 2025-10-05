'use client'

import { motion } from 'framer-motion'

const legacy = [
  { title: 'Settlement', value: '2-5 days', detail: 'Batch netting, manual reconciliation.' },
  { title: 'Finality', value: 'Probabilistic', detail: 'Reversal risk until cutoff windows.' },
  { title: 'Netting', value: 'Manual cycles', detail: 'Excel, emails, overnight ACH.' },
  { title: 'Privacy', value: 'Public PII leaks', detail: 'Data scattered across correspondents.' },
]

const cleara = [
  { title: 'Settlement', value: '1-3 seconds', detail: 'Consensus-native netting with proof.' },
  { title: 'Finality', value: 'Absolute', detail: 'BFT finality embedded in order flow.' },
  { title: 'Netting', value: 'Deterministic', detail: 'Automated compression inside consensus.' },
  { title: 'Privacy', value: 'Encrypted HPKE envelopes', detail: 'Pseudonymous on-chain kernels.' },
]

export default function Problem() {
  return (
    <section className="relative mx-auto w-full max-w-6xl px-6 py-24 sm:px-10">
      <div className="absolute inset-x-0 top-0 -z-10 h-1/2 bg-gradient-to-b from-[#64c8ff0d] to-transparent" />
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <p className="text-sm uppercase tracking-[0.5em] text-white/50">Legacy rails weren&apos;t built for this</p>
        <h2 className="mt-4 text-4xl font-semibold text-white/95 sm:text-5xl">Correspondent banking is an analog relic</h2>
        <p className="mx-auto mt-5 max-w-3xl text-base text-white/70 sm:text-lg">
          Cross-border payments still crawl through settlement windows, manual netting and bilateral spreadsheets. Cleara collapses those cycles into a single, verifiable ledger move.
        </p>
      </motion.div>

      <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
        <motion.div
          className="space-y-4 rounded-3xl border border-white/10 bg-gradient-to-br from-[rgba(26,15,24,0.78)] via-[rgba(20,12,26,0.78)] to-[rgba(27,10,30,0.78)] p-8 backdrop-blur-2xl"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="flex items-center justify-between text-sm uppercase tracking-[0.4em] text-white/40">
            <span>Legacy rails</span>
            <span className="text-red-400/60">Σ</span>
          </div>
          {legacy.map((item) => (
            <div key={item.title} className="rounded-2xl border border-white/5 bg-white/5 p-4">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/45">
                <span>{item.title}</span>
                <span>●</span>
              </div>
              <div className="mt-2 text-2xl font-semibold text-white/80">{item.value}</div>
              <p className="mt-1 text-sm text-white/60">{item.detail}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          className="hidden flex-col items-center lg:flex"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <div className="h-28 w-px bg-gradient-to-b from-red-500/30 via-white/40 to-cyan-400/60" />
          <div className="mt-6 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.4em] text-white/60">
            Cleara shift
          </div>
          <div className="mt-6 h-28 w-px bg-gradient-to-b from-cyan-400/60 via-white/40 to-cyan-500/60" />
        </motion.div>

        <motion.div
          className="space-y-4 rounded-3xl border border-white/10 bg-gradient-to-br from-[rgba(5,32,54,0.78)] via-[rgba(5,28,42,0.78)] to-[rgba(6,28,41,0.78)] p-8 backdrop-blur-2xl"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="flex items-center justify-between text-sm uppercase tracking-[0.4em] text-white/40">
            <span>Cleara protocol</span>
            <span className="text-[#64c8ff]">∞</span>
          </div>
          {cleara.map((item) => (
            <div key={item.title} className="rounded-2xl border border-white/10 bg-white/10 p-4 shadow-[0_0_30px_rgba(100,200,255,0.1)]">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/45">
                <span>{item.title}</span>
                <span>◦</span>
              </div>
              <div className="mt-2 text-2xl font-semibold text-white/90">{item.value}</div>
              <p className="mt-1 text-sm text-white/70">{item.detail}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
