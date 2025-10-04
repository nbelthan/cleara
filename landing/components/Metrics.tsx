'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

type Metric = {
  title: string
  description: string
  prefix?: string
  suffix?: string
  target?: number
  decimals?: number
  staticText?: string
}

const metrics: Metric[] = [
  {
    title: 'Deterministic Finality',
    prefix: '1-',
    target: 3,
    suffix: 's',
    description: 'Hard BFT finality across validators. No probabilistic rollbacks.',
  },
  {
    title: 'Throughput Ceiling',
    target: 5000,
    suffix: ' TPS',
    description: 'Direct settlement path handles thousands of payments per second.',
  },
  {
    title: 'Netting Compression',
    target: 20,
    suffix: '×',
    description: 'Deterministic multilateral netting shrinks reciprocal flows before they settle.',
  },
  {
    title: 'Kernel Footprint',
    target: 500,
    suffix: ' B',
    description: 'Minimal CBOR kernels anchor encrypted payloads without leaking PII.',
  },
  {
    title: 'Fee Floor',
    target: 0.5,
    suffix: '¢',
    decimals: 1,
    description: 'Multi-asset fee model keeps high-value corridors economical.',
  },
  {
    title: 'Compliance Baseline',
    staticText: 'GDPR native',
    description: 'Right-to-erasure backed by encrypted envelopes and retention controls.',
  },
]

function formatValue(metric: Metric, value: number) {
  if (metric.decimals) {
    return value.toFixed(metric.decimals)
  }
  if (metric.target && metric.target >= 1000) {
    return Math.round(value).toLocaleString()
  }
  return Math.round(value).toString()
}

function MetricCard({ metric, index, trigger }: { metric: Metric; index: number; trigger: boolean }) {
  const [display, setDisplay] = useState(() => {
    if (metric.staticText) return metric.staticText
    return `${metric.prefix ?? ''}0${metric.suffix ?? ''}`
  })

  useEffect(() => {
    if (!trigger || metric.staticText || typeof metric.target !== 'number') return

    let start: number | null = null
    const duration = 1200 + index * 120

    const animate = (timestamp: number) => {
      if (start === null) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const value = (metric.target ?? 0) * progress
      const formatted = `${metric.prefix ?? ''}${formatValue(metric, value)}${metric.suffix ?? ''}`
      setDisplay(formatted)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    const frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [trigger, metric, index])

  useEffect(() => {
    if (metric.staticText) {
      setDisplay(metric.staticText)
    }
  }, [metric.staticText])

  return (
    <motion.div
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/10 p-6 shadow-[0_0_20px_rgba(100,200,255,0.08)]"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.05 }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.08),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_120%,rgba(100,200,255,0.12),transparent_60%)] opacity-60" />
      <div className="relative flex flex-col gap-3">
        <div className="text-sm uppercase tracking-[0.35em] text-white/50">{metric.title}</div>
        <div className="text-4xl font-semibold text-white/95">{display}</div>
        <p className="text-sm text-white/70">{metric.description}</p>
      </div>
    </motion.div>
  )
}

export default function Metrics() {
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="px-6 py-24 sm:px-10">
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <p className="text-sm uppercase tracking-[0.5em] text-white/50">Built for speed</p>
          <h2 className="mt-4 text-4xl font-semibold text-white/95 sm:text-5xl">Precision settlement under load</h2>
          <p className="mt-5 text-base text-white/70 sm:text-lg">
            Cleara is engineered for the corridors where throughput, privacy, and compliance all matter at once. These are not projections—these are the acceptance envelopes for mainnet.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {metrics.map((metric, index) => (
            <MetricCard key={metric.title} metric={metric} index={index} trigger={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
