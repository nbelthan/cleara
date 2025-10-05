'use client'

import { motion } from 'framer-motion'

const layers = [
  {
    id: 'onchain',
    title: 'Layer 1 — Settlement Kernel',
    color: 'from-[rgba(26,58,82,0.7)] via-[rgba(15,42,63,0.7)] to-[rgba(5,20,37,0.7)]',
    metrics: [
      '300-500 byte CBOR kernels',
      'Native ISO 20022 identifiers',
      'BFT consensus with deterministic ordering',
    ],
    footnote: 'What clears on-chain is math, not identity. Proofs stay. Secrets do not.',
  },
  {
    id: 'offchain',
    title: 'Layer 2 — Encrypted Identity Plane',
    color: 'from-[rgba(47,27,74,0.7)] via-[rgba(33,14,58,0.7)] to-[rgba(17,4,36,0.7)]',
    metrics: [
      'HPKE envelopes with multi-recipient keys',
      'ISO 20022 payloads stored off-chain',
      'Selective disclosure for regulators and counterparties',
    ],
    footnote: 'Decrypt only if you have the authority key. Everyone else sees zero leakage.',
  },
]

export default function Architecture() {
  return (
    <section className="relative overflow-hidden px-6 py-24 sm:px-10">
      <div className="absolute inset-x-0 top-1/3 -z-10 h-[500px] bg-[radial-gradient(circle_at_center,_rgba(100,200,255,0.12),_transparent_70%)]" />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <p className="text-sm uppercase tracking-[0.5em] text-white/50">Two layers. Infinite precision.</p>
          <h2 className="mt-4 text-4xl font-semibold text-white/95 sm:text-5xl">Public settlement. Private payloads.</h2>
          <p className="mx-auto mt-5 max-w-3xl text-base text-white/70 sm:text-lg">
            Minimal on-chain kernels commit to encrypted ISO 20022 documents off-chain. Validators reach finality, auditors gain provable trails, counterparties selectively decrypt.
          </p>
        </motion.div>

        <div className="relative grid gap-8 lg:grid-cols-2">
          <span className="pointer-events-none absolute left-1/2 top-12 hidden h-[calc(100%-6rem)] w-px -translate-x-1/2 bg-[linear-gradient(180deg,rgba(100,200,255,0.1)_0%,rgba(171,123,255,0.4)_50%,rgba(100,200,255,0.1)_100%)] lg:block" />
          <span className="pointer-events-none absolute left-1/2 top-12 hidden h-32 w-[480px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(171,123,255,0.18),_transparent_70%)] blur-3xl lg:block" />

          {layers.map((layer, index) => (
            <motion.div
              key={layer.id}
              className={`relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br ${layer.color} p-10 backdrop-blur-2xl`}
              initial={{ opacity: 0, y: 40, x: index === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.85, ease: 'easeOut' }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_55%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.06),transparent_60%)]" />
              <div className="relative flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-semibold text-white/95">{layer.title}</h3>
                  <div className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.4em] text-white/60">
                    {index === 0 ? 'Public' : 'Private'}
                  </div>
                </div>
                <div className="flex flex-col gap-4 text-sm text-white/70">
                  {layer.metrics.map((metric) => (
                    <div key={metric} className="rounded-2xl border border-white/10 bg-white/10 p-4">
                      <div className="flex items-center gap-3">
                        <span className="h-2 w-2 rounded-full bg-[#64c8ff] shadow-[0_0_15px_rgba(100,200,255,0.8)]" />
                        <p>{metric}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-white/60">{layer.footnote}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
