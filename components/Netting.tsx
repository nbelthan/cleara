'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const nodes = [
  { id: 'A', dense: { x: 20, y: 20 }, netted: { x: 20, y: 30 } },
  { id: 'B', dense: { x: 60, y: 18 }, netted: { x: 40, y: 18 } },
  { id: 'C', dense: { x: 85, y: 40 }, netted: { x: 60, y: 30 } },
  { id: 'D', dense: { x: 30, y: 60 }, netted: { x: 30, y: 48 } },
  { id: 'E', dense: { x: 55, y: 70 }, netted: { x: 50, y: 60 } },
  { id: 'F', dense: { x: 80, y: 62 }, netted: { x: 70, y: 48 } },
  { id: 'G', dense: { x: 45, y: 35 }, netted: { x: 45, y: 40 } },
  { id: 'H', dense: { x: 68, y: 48 }, netted: { x: 65, y: 38 } },
]

const denseEdges: Array<[number, number]> = [
  [0, 1],
  [0, 2],
  [0, 3],
  [1, 2],
  [1, 4],
  [2, 5],
  [2, 6],
  [3, 4],
  [3, 6],
  [4, 5],
  [4, 6],
  [4, 7],
  [5, 7],
]

const nettedEdges: Array<[number, number]> = [
  [0, 2],
  [0, 4],
  [1, 2],
  [3, 4],
  [4, 5],
]

export default function Netting() {
  const [compressed, setCompressed] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => setCompressed((prev) => !prev), 5200)
    return () => clearInterval(timer)
  }, [])

  const activeEdges = compressed ? nettedEdges : denseEdges
  const activeSet = new Set(activeEdges.map(([from, to]) => `${from}-${to}`))

  return (
    <section className="px-6 py-24 sm:px-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 lg:flex-row lg:items-center">
        <div className="flex-1">
          <p className="text-sm uppercase tracking-[0.5em] text-white/50">Multilateral netting. Deterministic.</p>
          <h2 className="mt-4 text-4xl font-semibold text-white/95 sm:text-5xl">
            Compress reciprocal flows before they ever touch a bank ledger.
          </h2>
          <p className="mt-6 max-w-xl text-base text-white/70 sm:text-lg">
            Cleara performs multilateral compression inside consensus. When the corridor simmers with back-and-forth payments, the protocol collapses those legs into the fewest, provable cash movements.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
              <div className="text-xs uppercase tracking-[0.35em] text-white/50">Before</div>
              <div className="mt-2 text-3xl font-semibold text-white/90">1,000 gross payments</div>
              <p className="mt-2 text-sm text-white/70">Manual cycles, bilateral spreadsheets, uncertain cash positions.</p>
            </div>
            <div className="rounded-2xl border border-[#64c8ff]/30 bg-[rgba(5,26,39,0.7)] p-5 shadow-[0_0_30px_rgba(100,200,255,0.18)]">
              <div className="text-xs uppercase tracking-[0.35em] text-white/60">After</div>
              <div className="mt-2 text-3xl font-semibold text-[#8ce3ff]">150 net settlements</div>
              <p className="mt-2 text-sm text-white/70">Consensus-native proofs, deterministic ordering, immediate finality.</p>
            </div>
          </div>
        </div>

        <div className="relative flex-1">
          <div className="absolute inset-0 -z-10 rounded-[36px] bg-[radial-gradient(circle_at_center,_rgba(100,200,255,0.14),_transparent_70%)] blur-3xl" />
          <div className="rounded-[36px] border border-white/10 bg-white/5 p-8 backdrop-blur-3xl">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.4em] text-white/60">
              <span>{compressed ? 'Compressed topology' : 'Gross topology'}</span>
              <span className="text-white/30">{compressed ? 'Proofs locked' : 'Awaiting compression'}</span>
            </div>
            <div className="relative mt-6 h-[340px] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#04101c] via-[#050814] to-[#041220] p-6">
              <svg viewBox="0 0 100 80" className="h-full w-full">
                <defs>
                  <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#64c8ff" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#64c8ff" stopOpacity="0" />
                  </radialGradient>
                </defs>
                {denseEdges.map(([from, to], idx) => {
                  const fromNode = nodes[from]
                  const toNode = nodes[to]
                  const keyA = `${from}-${to}`
                  const keyB = `${to}-${from}`
                  const show = activeSet.has(keyA) || activeSet.has(keyB)

                  return (
                    <motion.line
                      key={`edge-${from}-${to}`}
                      strokeLinecap="round"
                      initial={false}
                      animate={{
                        x1: compressed ? fromNode.netted.x : fromNode.dense.x,
                        y1: compressed ? fromNode.netted.y : fromNode.dense.y,
                        x2: compressed ? toNode.netted.x : toNode.dense.x,
                        y2: compressed ? toNode.netted.y : toNode.dense.y,
                        stroke: show
                          ? 'rgba(100,200,255,0.7)'
                          : compressed
                          ? 'rgba(255,255,255,0.1)'
                          : 'rgba(255,255,255,0.18)',
                        strokeWidth: show ? 2.2 : 0.6,
                        opacity: show ? 1 : compressed ? 0.25 : 0.6,
                      }}
                      transition={{ duration: 1, delay: idx * 0.02, ease: 'easeInOut' }}
                    />
                  )
                })}
                {nodes.map((node) => (
                  <motion.g key={node.id} initial={false}>
                    <motion.circle
                      r={compressed ? 1.6 : 1.2}
                      fill="url(#nodeGlow)"
                      animate={{
                        cx: compressed ? node.netted.x : node.dense.x,
                        cy: compressed ? node.netted.y : node.dense.y,
                        r: compressed ? 1.8 : 1.2,
                      }}
                      transition={{ duration: 1.2, ease: 'easeInOut' }}
                    />
                    <motion.circle
                      r={compressed ? 0.9 : 0.7}
                      fill={compressed ? '#8ce3ff' : '#ffffff'}
                      animate={{
                        cx: compressed ? node.netted.x : node.dense.x,
                        cy: compressed ? node.netted.y : node.dense.y,
                      }}
                      transition={{ duration: 1.2, ease: 'easeInOut' }}
                    />
                  </motion.g>
                ))}
              </svg>
              <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/60">
                <span className="h-2 w-2 rounded-full bg-[#64c8ff] shadow-[0_0_10px_rgba(100,200,255,0.8)]" />
                Compression factor ≈ 6.7× live
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
