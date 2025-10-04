'use client'

import { motion } from 'framer-motion'

const sections = [
  {
    title: 'Links',
    links: ['Documentation', 'Whitepaper', 'Blog'],
  },
  {
    title: 'Community',
    links: ['X / Twitter', 'GitHub', 'Validator Discord'],
  },
  {
    title: 'Legal',
    links: ['Privacy', 'Terms', 'Cookies'],
  },
]

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/10 bg-[#050914]/95 px-6 py-16 sm:px-10">
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(100,200,255,0.3),transparent)]" />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 lg:flex-row lg:justify-between">
        <motion.div
          className="max-w-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="text-lg font-semibold tracking-[0.35em] text-white/80">CLEΛRA</div>
          <p className="mt-4 text-sm text-white/60">
            ISO 20022 native settlement for stablecoins and real-time gross settlement corridors. Engineered for banks that demand proofs, privacy, and predictable finality.
          </p>
        </motion.div>

        <div className="grid flex-1 gap-10 sm:grid-cols-3">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.05 }}
              className="space-y-3"
            >
              <div className="text-xs uppercase tracking-[0.4em] text-white/50">{section.title}</div>
              <ul className="space-y-2 text-sm text-white/70">
                {section.links.map((link) => (
                  <li key={link} className="cursor-pointer transition hover:text-white">
                    {link}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs uppercase tracking-[0.3em] text-white/40 sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} Cleara Protocol. ISO 20022 native settlement.</span>
        <span>Deterministic • Compliant • Instant</span>
      </div>
    </footer>
  )
}
