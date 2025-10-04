'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const MotionLink = motion(Link)

export default function CTA() {
  return (
    <section
      id="cta"
      className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-[40px] border border-white/10 bg-gradient-to-br from-[#03101E] via-[#07172C] to-[#120B25] px-6 py-20 sm:px-16"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(100,200,255,0.18),_transparent_70%)]" />
      <div className="absolute inset-0 bg-[conic-gradient(from_180deg_at_50%_50%,rgba(171,123,255,0.18),transparent_50%,rgba(100,200,255,0.12))] opacity-60" />
      <div className="relative flex flex-col items-center gap-8 text-center">
        <motion.p
          className="text-sm uppercase tracking-[0.5em] text-white/60"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          The future of settlement starts here
        </motion.p>
        <motion.h2
          className="max-w-3xl text-balance text-4xl font-semibold text-white/95 sm:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
        >
          Join the institutions building instant, irreversible, regulator-grade stablecoin settlement.
        </motion.h2>
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <motion.button
            className="relative overflow-hidden rounded-full border border-white/20 bg-white/90 px-10 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-black shadow-[0_10px_40px_rgba(100,200,255,0.35)] transition hover:bg-white"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Request Access
          </motion.button>
          <MotionLink
            href="/whitepaper"
            className="rounded-full border border-white/20 px-9 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-white/80 transition hover:border-white/50 hover:text-white"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Read Whitepaper
          </MotionLink>
        </div>
        <MotionLink
          href="#"
          className="text-sm uppercase tracking-[0.4em] text-white/60 underline-offset-4 transition hover:text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.25 }}
        >
          Join waitlist →
        </MotionLink>
      </div>
    </section>
  )
}
