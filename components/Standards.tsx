'use client'

import { motion } from 'framer-motion'

const standards = [
  { label: 'ISO 20022', short: 'ISO', note: 'Native message semantics' },
  { label: 'CometBFT', short: 'BFT', note: 'BFT finality engine' },
  { label: 'HPKE', short: 'HPKE', note: 'RFC 9180 envelopes' },
  { label: 'CBOR', short: 'CBOR', note: 'RFC 8949 kernels' },
  { label: 'Ed25519', short: 'ED25519', note: 'Validator signatures' },
  { label: 'GDPR', short: 'GDPR', note: 'Article 17 compliant' },
]

export default function Standards() {
  return (
    <section className="px-6 pb-24 sm:px-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <p className="text-sm uppercase tracking-[0.5em] text-white/50">Built on proven standards</p>
          <h2 className="mt-4 text-4xl font-semibold text-white/95 sm:text-5xl">Trusted primitives. Zero vendor lock-in.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base text-white/70 sm:text-lg">
            We anchor Cleara in audited standards—no proprietary cryptography, no speculative consensus. Banks get a protocol they can diligence, regulators get standards they already trust.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {standards.map((standard, index) => (
            <motion.div
              key={standard.label}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/10 px-8 py-9 text-left backdrop-blur-xl"
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.06 }}
              whileHover={{ y: -6 }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_-10%,rgba(100,200,255,0.16),transparent_60%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_120%,rgba(171,123,255,0.12),transparent_65%)]" />
              <div className="relative flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="rounded-xl border border-white/15 bg-white/15 px-3 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-white/80">
                    {standard.short}
                  </div>
                  <span className="h-8 w-px bg-white/10" />
                  <div>
                    <div className="text-lg font-semibold text-white/90">{standard.label}</div>
                    <p className="text-sm text-white/65">{standard.note}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
