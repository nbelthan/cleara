'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const toc = [
  { id: 'abstract', label: 'Abstract' },
  { id: 'section-1', label: '1. Motivation & Goals' },
  { id: 'section-2', label: '2. Ledger Data Model' },
  { id: 'section-3', label: '3. Transaction Families' },
  { id: 'section-4', label: '4. Consensus Path & Netting Integration' },
  { id: 'section-5', label: '5. Deterministic Multilateral Netting' },
  { id: 'section-6', label: '6. Stablecoins & Asset Model' },
  { id: 'section-7', label: '7. Fees & Multi-Asset Gas' },
  { id: 'section-8', label: '8. Finality Tiers & Liquidity Certificates' },
  { id: 'section-9', label: '9. Cross-Border FX (Atomic PvP)' },
  { id: 'section-10', label: '10. Mempool, Ordering & MEV' },
  { id: 'section-11', label: '11. Data Availability & Light Clients' },
  { id: 'section-12', label: '12. Evidence, Slashing & Governance' },
  { id: 'section-13', label: '13. Protocol Parameters' },
  { id: 'section-14', label: '14. Performance Envelope' },
  { id: 'section-15', label: '15. Security & Privacy Considerations' },
  { id: 'section-16', label: '16. Interop & Execution Environments' },
  { id: 'section-17', label: '17. Reference Edge API' },
  { id: 'section-18', label: '18. Conformance Test Vectors' },
  { id: 'section-19', label: '19. Conclusion' },
  { id: 'appendix-a', label: 'Appendix A. Privacy Architecture & GDPR' },
  { id: 'appendix-b', label: 'Appendix B. Regulator Access & Returns' },
  { id: 'appendix-c', label: 'Appendix C. Implementation Roadmap' },
  { id: 'appendix-d', label: 'Appendix D. Technology Stack' },
  { id: 'appendix-e', label: 'Appendix E. Travel Rule Conformity' },
]

export default function Whitepaper() {
  return (
    <main className="relative min-h-screen bg-[#f7f5f2] text-slate-900">
      <header className="fixed inset-x-0 top-0 z-40 border-b border-slate-200 bg-[#fdfcf9]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 text-xs uppercase tracking-[0.4em]">
          <Link href="/" className="text-slate-600 transition hover:text-slate-900">
            ← Cleara main site
          </Link>
          <div className="flex items-center gap-4 text-[0.7rem] tracking-[0.5em]">
            <button onClick={() => window.print()} className="text-slate-600 transition hover:text-slate-900">
              Print / PDF
            </button>
            <a
              href="/specs/whitepaper.md"
              className="rounded-full border border-slate-300 px-4 py-2 font-medium tracking-[0.3em] text-slate-700 transition hover:border-slate-500 hover:text-slate-900"
            >
              Download Markdown
            </a>
          </div>
        </div>
      </header>

      <article className="mx-auto max-w-4xl px-6 pb-24 pt-32 font-serif leading-relaxed">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-16 border-b border-slate-300 pb-16"
        >
          <div className="text-center">
            <p className="mb-6 text-[0.7rem] tracking-[0.6em] text-slate-500">TECHNICAL WHITEPAPER · VERSION 1.0-ALPHA</p>
            <h1 className="text-4xl font-semibold uppercase tracking-[0.2em] text-slate-900 sm:text-[2.9rem]">
              Cleara<br />
              <span className="text-[2.5rem] tracking-[0.25em]">ISO 20022 Native Settlement Layer</span>
            </h1>
            <p className="mt-6 text-sm tracking-[0.4em] text-slate-500">
              Cleara Protocol Research · Draft for institutional review · 2025
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-6 text-left text-[0.75rem] leading-relaxed text-slate-600">
              <div>
                <span className="font-semibold text-slate-800">Status.</span> Technical draft — comments invited from banks, PSPs, and regulators.
              </div>
              <div>
                <span className="font-semibold text-slate-800">Licensing.</span> Text CC BY-SA 4.0 · Reference code Apache 2.0.
              </div>
            </div>
          </div>
        </motion.section>

        <section id="abstract" className="mb-16">
          <h2 className="mb-4 border-b-2 border-slate-900 pb-2 text-2xl font-semibold tracking-[0.15em] text-slate-900">
            Abstract
          </h2>
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-justify text-[1.05rem] leading-7 text-slate-800">
              Cleara is a permissionless payments ledger that embeds ISO 20022 semantics directly into the consensus pathway.
              Compact on-chain <em>Payment Kernels</em> (≈300–500 B) commit to HPKE-encrypted ISO envelopes stored off-chain, enabling
              bank-grade privacy with deterministic finality in 1–3 seconds. When corridor liquidity allows, Cleara executes
              multilateral netting <em>inside</em> block production, emitting verifiable <em>NettingProofs</em> and compressing reciprocal flows by
              up to 20×. The protocol natively supports multi-asset fees (stablecoin gas), atomic PvP FX legs, inclusion-list backed
              anti-censorship, and evidence-based slashing. This document specifies the data model, transaction families, consensus
              hooks, fee mechanics, proofs, security assumptions, and reference APIs for institutional deployment.
            </p>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="mb-4 border-b border-slate-300 pb-2 text-xl font-semibold tracking-[0.2em] text-slate-900">
            Table of Contents
          </h2>
          <div className="grid gap-2 text-[0.95rem] sm:grid-cols-2">
            {toc.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="flex items-center justify-between rounded-lg border border-transparent px-3 py-2 font-medium tracking-[0.08em] text-slate-600 transition hover:border-slate-200 hover:bg-white"
              >
                <span>{item.label}</span>
                <span className="text-[0.65rem] text-slate-400">→</span>
              </a>
            ))}
          </div>
        </section>

        <section id="section-1" className="mb-16 scroll-mt-32">
          <header className="mb-4 flex items-end justify-between border-b border-slate-300 pb-2">
            <h2 className="text-2xl font-semibold tracking-[0.12em] text-slate-900">1. Motivation &amp; Goals</h2>
            <span className="text-xs uppercase tracking-[0.4em] text-slate-400">Design invariants</span>
          </header>
          <p className="mb-4 text-justify text-slate-800">
            Cleara targets the corridors where traditional correspondent banking fails: long settlement windows, bilateral netting,
            and privacy regimes that clash with public ledgers. The protocol is engineered around six invariants that emerged from
            consultations with global banks, PSPs, and regulators.
          </p>
          <ul className="mb-6 list-disc space-y-2 pl-6 text-[1.05rem] text-slate-800">
            <li>
              <strong>Standards-true:</strong> Ledger objects map 1:1 to ISO 20022 fields (pacs.008, pacs.004, pacs.002), eliminating middleware translation risk.
            </li>
            <li>
              <strong>Stablecoin-first:</strong> Native multi-asset balances for USD/EUR/local stablecoins and deposit tokens with fees payable in those assets.
            </li>
            <li>
              <strong>Privacy-by-default:</strong> No PII on-chain—HPKE envelopes store ISO payloads off-chain with cryptographic commitments.
            </li>
            <li>
              <strong>Deterministic performance:</strong> Byzantine finality in 1–3 seconds, with sub-second receipts when liquidity certificates are provisioned.
            </li>
            <li>
              <strong>Netting when useful:</strong> Consensus-native multilateral compression with deterministic proofs and automatic fallback to direct settlement.
            </li>
            <li>
              <strong>Credible neutrality:</strong> Permissionless validators, inclusion SLAs with slashing, encrypted mempool, and periodic state-root anchors.
            </li>
          </ul>
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="mb-2 text-sm font-semibold tracking-[0.2em] text-slate-600">Threat model</h3>
            <p className="text-sm text-slate-700">
              Censoring proposers or builders, MEV and ordering games, data-availability withholding/eclipsing, stake concentration or
              long-range attacks, and privacy leakage across remittance flows. Mitigations are called out in Sections 4, 10, 11, and 12.
            </p>
          </div>
        </section>

        <section id="section-2" className="mb-16 scroll-mt-32">
          <header className="mb-4 flex items-end justify-between border-b border-slate-300 pb-2">
            <h2 className="text-2xl font-semibold tracking-[0.12em] text-slate-900">2. Ledger Data Model</h2>
            <span className="text-xs uppercase tracking-[0.4em] text-slate-400">Two-layer separation</span>
          </header>
          <p className="mb-4 text-justify text-slate-800">
            Cleara separates on-chain minimal state from off-chain rich documents. Payment kernels provide the deterministic state
            transitions; encrypted ISO envelopes carry the regulatory payload. The `doc_hash` anchors both worlds.
          </p>
          <h3 className="mb-2 text-lg font-semibold tracking-[0.08em] text-slate-900">2.1 Payment Kernel (on-chain)</h3>
          <p className="text-slate-800">
            Canonical CBOR map with integer keys, signed by the originating VASP. Keys align with ISO message definition identifiers.
            Typical serialized size: 300–500 bytes.
          </p>
          <pre className="my-4 overflow-x-auto rounded-lg border border-slate-300 bg-slate-900 p-4 text-sm leading-6 text-slate-100">
{`PaymentKernel = {
  0: ver (uint8),           1: msg_type (pacs code),
  2: isov (uint16),         3: biz_msg_idr (bstr16..32),
  4: e2e_id (bstr16..32),   5: ts (unix_nanos),
  6: asset_id (uint32),     7: amount (bstr u128),
  8: payer_ref (bstr32),    9: payee_ref (bstr32),
 10: purpose_code (uint16), 11: memo_hash (bstr32),
 12: doc_hash (bstr32),     13: sig (Ed25519)
}`}
          </pre>
          <h3 className="mb-2 text-lg font-semibold tracking-[0.08em] text-slate-900">2.2 ISO Envelope (off-chain)</h3>
          <ul className="list-disc space-y-2 pl-6 text-slate-800">
            <li>HPKE (X25519 · HKDF-SHA256 · ChaCha20-Poly1305) encrypts the full ISO document; CEK derived per envelope.</li>
            <li>Recipients array encodes `(role, pubkey, kid)`; doc hash = `SHA-256(envelope_bytes)`.</li>
            <li>Storage via MinIO/S3 with object lock or CID-addressed IPFS; only the hash appears on-chain.</li>
          </ul>
          <h3 className="mt-6 mb-2 text-lg font-semibold tracking-[0.08em] text-slate-900">2.3 Native balance map</h3>
          <p className="text-slate-800">
            Balances are indexed by `(AccountRef, AssetId)`; no token contracts required. Compliance hooks allow issuance policies,
            sanctions checks, and travel-rule assertions during ante handling.
          </p>
        </section>

        <section id="section-3" className="mb-16 scroll-mt-32">
          <header className="mb-4 flex items-end justify-between border-b border-slate-300 pb-2">
            <h2 className="text-2xl font-semibold tracking-[0.12em] text-slate-900">3. Transaction Families</h2>
            <span className="text-xs uppercase tracking-[0.4em] text-slate-400">State machines</span>
          </header>
          <div className="space-y-4 text-slate-800">
            <div>
              <strong>MsgPay</strong> — debits payer, credits payee, persists kernel, emits pacs.002 status events.
            </div>
            <div>
              <strong>MsgReturn</strong> — ISO pacs.004 refund path; atomically reverses funds with memoized linkage to original payment.
            </div>
            <div>
              <strong>MsgStatus</strong> — broadcast application status (accepted/settled/rejected) for participant monitoring.
            </div>
            <div>
              <strong>MsgPvP</strong> — atomic two-leg FX (PvP) keyed by one `e2e_id`; both legs either settle or abort.
            </div>
            <div>
              <strong>Instrument lifecycle</strong> — create, mint, burn, freeze, pause for stablecoin issuers with policy hooks.
            </div>
          </div>
          <p className="mt-6 text-sm text-slate-600">
            See Appendix B for regulator-triggered pacs.004 behaviour and slashing conditions when builders omit qualifying payments.
          </p>
        </section>

        <section id="section-4" className="mb-16 scroll-mt-32">
          <header className="mb-4 flex items-end justify-between border-b border-slate-300 pb-2">
            <h2 className="text-2xl font-semibold tracking-[0.12em] text-slate-900">4. Consensus Path &amp; Netting Integration</h2>
            <span className="text-xs uppercase tracking-[0.4em] text-slate-400">ABCI hooks</span>
          </header>
          <ul className="list-disc space-y-2 pl-6 text-slate-800">
            <li>Based on CometBFT with 750 ms block target and deterministic block proposer rotation.</li>
            <li>Ante handler enforces kernel size, fee asset eligibility, inclusion deadlines, and liquidity certificate constraints.</li>
            <li>Proposer assembles candidate block → runs deterministic netting per asset/cycle (Section 5) → emits NettingProof commitments.</li>
            <li>Validators verify kernels, settlement edges, and proofs before voting; evidence routes back via Section 12 mechanisms.</li>
          </ul>
        </section>

        <section id="section-5" className="mb-16 scroll-mt-32">
          <header className="mb-4 flex items-end justify-between border-b border-slate-300 pb-2">
            <h2 className="text-2xl font-semibold tracking-[0.12em] text-slate-900">5. Deterministic Multilateral Netting</h2>
            <span className="text-xs uppercase tracking-[0.4em] text-slate-400">Algo ID 0x01</span>
          </header>
          <p className="mb-4 text-justify text-slate-800">
            When corridor demand warrants, proposers invoke a deterministic greedy algorithm that compresses reciprocal positions before
            final settlement, yielding verifiable proofs and reduced cash movements.
          </p>
          <ol className="mb-4 list-decimal space-y-2 pl-6 text-slate-800">
            <li>Partition kernels per asset and netting cycle; compute participant position vectors.</li>
            <li>Sort debtors and creditors; run two-pointer greedy matching to produce ≤ |P|−1 settlement edges.</li>
            <li>Emit `NettingProof` object with Merkle roots over kernels, participants, positions, and settlement edges.</li>
            <li>Fallback: if compression factor &lt;2× for three cycles, proposer MUST switch to direct settlement until ratios recover.</li>
          </ol>
          <div className="rounded-xl border border-slate-300 bg-white p-4 font-mono text-sm text-slate-700">
{`while p < len(D) and q < len(C):
  x = min(-pos[D[p]], pos[C[q]])
  emit(D[p] -> C[q], x)
  pos[D[p]] += x; pos[C[q]] -= x
  if pos[D[p]] == 0: p += 1
  if pos[C[q]] == 0: q += 1`}
          </div>
        </section>

        <section id="section-6" className="mb-16 scroll-mt-32">
          <header className="mb-4 flex items-end justify-between border-b border-slate-300 pb-2">
            <h2 className="text-2xl font-semibold tracking-[0.12em] text-slate-900">6. Stablecoins &amp; Asset Model</h2>
            <span className="text-xs uppercase tracking-[0.4em] text-slate-400">Native issuance</span>
          </header>
          <p className="mb-4 text-justify text-slate-800">
            Stablecoins are first-class ledger citizens. Issuers register assets once, then rely on protocol-level lifecycle messages.
          </p>
          <ul className="mb-4 list-disc space-y-2 pl-6 text-slate-800">
            <li>Authorized issuers (`issuer_ref`) mint/burn with optional proof-of-reserves hashes.</li>
            <li>Freeze/Pause primitives operate at the protocol layer while allowing pacs.004 returns to complete.</li>
            <li>ERC-20 compatibility shim exposes balances to external tooling without compromising native semantics.</li>
          </ul>
        </section>

        <section id="section-7" className="mb-16 scroll-mt-32">
          <header className="mb-4 flex items-end justify-between border-b border-slate-300 pb-2">
            <h2 className="text-2xl font-semibold tracking-[0.12em] text-slate-900">7. Fees &amp; Multi-Asset Gas</h2>
            <span className="text-xs uppercase tracking-[0.4em] text-slate-400">Economic alignment</span>
          </header>
          <ul className="list-disc space-y-2 pl-6 text-slate-800">
            <li>Metering via gas units per op/byte; hard cap 640 B per kernel.</li>
            <li>Accepted fee assets: native token plus USDC/EURC (extensible). Pricing uses 60 s TWAP with ≥3 oracles.</li>
            <li>Fee vaults per asset distribute base fees; 30% default buy-and-burn of native asset.</li>
            <li>Fee floor: $0.005 equivalent per transaction to absorb consensus costs.</li>
          </ul>
        </section>

        <section id="section-8" className="mb-16 scroll-mt-32">
          <header className="mb-4 flex items-end justify-between border-b border-slate-300 pb-2">
            <h2 className="text-2xl font-semibold tracking-[0.12em] text-slate-900">8. Finality Tiers &amp; Liquidity Certificates</h2>
            <span className="text-xs uppercase tracking-[0.4em] text-slate-400">Service levels</span>
          </header>
          <p className="text-slate-800">
            Three service levels balance user experience with consensus guarantees:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-800">
            <li><strong>Instant:</strong> Sub-second receipts up to limit `l_inst`, backed by threshold-signed liquidity certificates.</li>
            <li><strong>Soft:</strong> Inclusion attested by proposer; subject to inclusion SLAs.</li>
            <li><strong>Hard:</strong> Finalized after 2–3 CometBFT rounds (≈1–3 s).</li>
          </ul>
        </section>

        <section id="section-9" className="mb-16 scroll-mt-32">
          <header className="mb-4 flex items-end justify-between border-b border-slate-300 pb-2">
            <h2 className="text-2xl font-semibold tracking-[0.12em] text-slate-900">9. Cross-Border FX (Atomic PvP)</h2>
            <span className="text-xs uppercase tracking-[0.4em] text-slate-400">Two-leg swaps</span>
          </header>
          <p className="text-slate-800">
            RFQ-driven liquidity providers post signed quotes; `MsgPvP` executes both legs atomically under one kernel commitment. Risk
            mitigations include per-asset haircuts, max slippage, and liquidity limits enforced in the ante handler.
          </p>
        </section>

        <section id="section-10" className="mb-16 scroll-mt-32">
          <header className="mb-4 flex items-end justify-between border-b border-slate-300 pb-2">
            <h2 className="text-2xl font-semibold tracking-[0.12em] text-slate-900">10. Mempool, Ordering &amp; MEV</h2>
            <span className="text-xs uppercase tracking-[0.4em] text-slate-400">Fair access</span>
          </header>
          <ul className="list-disc space-y-2 pl-6 text-slate-800">
            <li>Threshold-encrypted mempool with post-proposal decryption reduces targeted censorship.</li>
            <li>Inclusion lists: qualifying payments must be included within four blocks or the proposer is slashable.</li>
            <li>Optional PBS lane isolates payments from speculative order flow for banks requiring deterministic latency.</li>
          </ul>
        </section>

        <section id="section-11" className="mb-16 scroll-mt-32">
          <header className="mb-4 flex items-end justify-between border-b border-slate-300 pb-2">
            <h2 className="text-2xl font-semibold tracking-[0.12em] text-slate-900">11. Data Availability &amp; Light Clients</h2>
            <span className="text-xs uppercase tracking-[0.4em] text-slate-400">Sampling</span>
          </header>
          <ul className="list-disc space-y-2 pl-6 text-slate-800">
            <li>Reed–Solomon erasure coding `(k=48, m=16)` at 256 KiB chunk size.</li>
            <li>Light clients sample to detect ≥95% withholding within ~2 seconds.</li>
            <li>Block headers carry DA roots and NettingProof roots; Merkle paths prove kernel and settlement inclusion.</li>
          </ul>
        </section>

        <section id="section-12" className="mb-16 scroll-mt-32">
          <header className="mb-4 flex items-end justify-between border-b border-slate-300 pb-2">
            <h2 className="text-2xl font-semibold tracking-[0.12em] text-slate-900">12. Evidence, Slashing &amp; Governance</h2>
            <span className="text-xs uppercase tracking-[0.4em] text-slate-400">Accountability</span>
          </header>
          <ul className="list-disc space-y-2 pl-6 text-slate-800">
            <li>Missed inclusion vs SLA → `AvailabilityCertificate` → 0.5% slash + 24 h jail (capacity defense available).</li>
            <li>Invalid NettingProof → fraud proof with conflicting Merkle paths → up to 5% proposer slash.</li>
            <li>DA withholding escalates from inactivity leak to slashing on repeated offenses.</li>
            <li>Governance: time-locked parameter updates, feature flags for new netting algorithms, emergency direct-settlement mode.</li>
          </ul>
        </section>

        <section id="section-13" className="mb-16 scroll-mt-32">
          <header className="mb-4 flex items-end justify-between border-b border-slate-300 pb-2">
            <h2 className="text-2xl font-semibold tracking-[0.12em] text-slate-900">13. Protocol Parameters</h2>
            <span className="text-xs uppercase tracking-[0.4em] text-slate-400">Defaults</span>
          </header>
          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full min-w-[480px] text-sm">
              <thead className="bg-slate-100 text-left uppercase tracking-[0.2em] text-slate-600">
                <tr>
                  <th className="px-4 py-3">Parameter</th>
                  <th className="px-4 py-3 text-right">Default</th>
                  <th className="px-4 py-3">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-800">
                {[
                  ['Block time', '750 ms', '≈2-block finality target'],
                  ['Inclusion window (N)', '4 blocks', 'Slashable if violated'],
                  ['Kernel size max', '640 B', 'Enforced in ante handler'],
                  ['Max participants/cycle', '10,000', 'Per asset'],
                  ['Max kernels/cycle', '200,000', 'Per asset'],
                  ['Compression fallback', '<2× for 3 cycles', 'Switch to direct settlement'],
                  ['Instant cap (l_inst)', '$1,000', 'Per payment'],
                  ['Sender cap (L_window)', '$10,000 / 60 s', 'Per asset'],
                  ['Fee floor', '$0.005', 'Equivalent per tx'],
                  ['Base-fee burn', '30%', 'Auto buy-and-burn native'],
                  ['Unbonding', '21–28 days', 'Staking withdrawals'],
                ].map(([name, value, note]) => (
                  <tr key={name}>
                    <td className="px-4 py-3 font-medium">{name}</td>
                    <td className="px-4 py-3 text-right text-slate-900">{value}</td>
                    <td className="px-4 py-3 text-sm text-slate-700">{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="section-14" className="mb-16 scroll-mt-32">
          <header className="mb-4 flex items-end justify-between border-b border-slate-300 pb-2">
            <h2 className="text-2xl font-semibold tracking-[0.12em] text-slate-900">14. Performance Envelope</h2>
            <span className="text-xs uppercase tracking-[0.4em] text-slate-400">Sizing</span>
          </header>
          <ul className="list-disc space-y-2 pl-6 text-slate-800">
            <li>Kernel 300–500 B; envelope 1–5 KB (EXI + AEAD).</li>
            <li>Direct settlement throughput ≈5k TPS at 1 MB blocks, 500 ms cadence.</li>
            <li>Netting compression factor 3–20× in reciprocal corridors; automatic bypass when &lt;2×.</li>
            <li>Pruning keeps full-node storage manageable; envelopes remain off-chain.</li>
          </ul>
        </section>

        <section id="section-15" className="mb-16 scroll-mt-32">
          <header className="mb-4 flex items-end justify-between border-b border-slate-300 pb-2">
            <h2 className="text-2xl font-semibold tracking-[0.12em] text-slate-900">15. Security &amp; Privacy Considerations</h2>
            <span className="text-xs uppercase tracking-[0.4em] text-slate-400">Defense-in-depth</span>
          </header>
          <ul className="list-disc space-y-2 pl-6 text-slate-800">
            <li>Dual client implementations (Go and Rust) with shared conformance vectors.</li>
            <li>Periodic state-root anchoring to Ethereum and Bitcoin.</li>
            <li>libp2p/QUIC networking with anti-eclipse peer selection and geo-diverse peers.</li>
            <li>Validator keys stored in HSMs; threshold crypto for certificates; routine rotation policies.</li>
            <li>Optional ZK attestations for sanctions screening and amount bounds layered atop HPKE envelopes.</li>
          </ul>
        </section>

        <section id="section-16" className="mb-16 scroll-mt-32">
          <header className="mb-4 flex items-end justify-between border-b border-slate-300 pb-2">
            <h2 className="text-2xl font-semibold tracking-[0.12em] text-slate-900">16. Interop &amp; Execution Environments</h2>
            <span className="text-xs uppercase tracking-[0.4em] text-slate-400">Extensibility</span>
          </header>
          <p className="text-slate-800">
            ERC-20 shims provide API parity for DeFi tooling while maintaining native balances. Optional execution environments (EVM or
            Move) run parallel to payments, and governed bridge connectors manage external interoperability under risk limits.
          </p>
        </section>

        <section id="section-17" className="mb-16 scroll-mt-32">
          <header className="mb-4 flex items-end justify-between border-b border-slate-300 pb-2">
            <h2 className="text-2xl font-semibold tracking-[0.12em] text-slate-900">17. Reference Edge API</h2>
            <span className="text-xs uppercase tracking-[0.4em] text-slate-400">Bank / PSP integration</span>
          </header>
          <pre className="overflow-x-auto rounded-xl border border-slate-300 bg-slate-900 p-6 text-sm text-slate-100">
{`POST /v1/iso/envelope      → { doc_hash, uri, recipients[] }
POST /v1/tx/pay            Body: CBOR(PaymentKernel) → { tx_hash }
WS   /v1/events?biz_msg_idr=…  → pacs.002-style status stream
GET  /v1/payments/{biz_msg_idr} → { kernel, settlement_proofs }`}
          </pre>
          <p className="mt-4 text-sm text-slate-600">
            Account reference mapping remains off-ledger with the originating institution; only opaque hashes appear on-chain.
          </p>
        </section>

        <section id="section-18" className="mb-16 scroll-mt-32">
          <header className="mb-4 flex items-end justify-between border-b border-slate-300 pb-2">
            <h2 className="text-2xl font-semibold tracking-[0.12em] text-slate-900">18. Conformance Test Vectors</h2>
            <span className="text-xs uppercase tracking-[0.4em] text-slate-400">Excerpt</span>
          </header>
          <pre className="overflow-x-auto rounded-xl border border-slate-300 bg-white p-6 font-mono text-sm text-slate-800">
Kernels:
  k1: payer=A, payee=B, amount=100
  k2: payer=B, payee=C, amount=60
  k3: payer=C, payee=A, amount=40
  k4: payer=A, payee=C, amount=20

Positions:
  pos[A] = -80
  pos[B] = +40
  pos[C] = +40

Greedy edges → A→B: 40, A→C: 40 (≤ |P|−1)
Proof roots: Merkle(kernels, participants, positions, edges)
          </pre>
        </section>

        <section id="section-19" className="mb-20 scroll-mt-32">
          <header className="mb-4 flex items-end justify-between border-b border-slate-300 pb-2">
            <h2 className="text-2xl font-semibold tracking-[0.12em] text-slate-900">19. Conclusion</h2>
            <span className="text-xs uppercase tracking-[0.4em] text-slate-400">Outlook</span>
          </header>
          <p className="text-justify text-slate-800">
            Cleara delivers standards-true, privacy-preserving, deterministic settlement for institutional stablecoin flows. Direct
            settlement already provides hard finality in seconds; as payment corridors densify, consensus-integrated netting amplifies
            capacity without compromising auditability. By binding ISO semantics to encrypted payloads and enforcing neutrality at the
            protocol layer, Cleara offers banks and PSPs a credible path to programmable settlement without abandoning regulatory rigor.
          </p>
        </section>

        <section className="mb-20 border-t border-slate-300 pt-12" id="appendix-a">
          <h2 className="mb-6 text-2xl font-semibold tracking-[0.14em] text-slate-900">Appendix A. Privacy Architecture &amp; GDPR Compliance</h2>
          <p className="mb-4 text-slate-800">
            Summarizes <em>Cleara Protocol: Privacy Architecture &amp; GDPR Compliance</em> (Sept 2025).
          </p>
          <ul className="list-disc space-y-2 pl-6 text-slate-800">
            <li>Two-layer privacy: on-chain kernels expose only hashes and opaque account references; ISO documents remain encrypted off-chain.</li>
            <li>HPKE envelopes support selective disclosure—banks include regulator keys based on jurisdictional thresholds.</li>
            <li>Right to erasure satisfied by deleting envelopes; on-chain state retains only non-PII commitments.</li>
            <li>Competitive edge: stronger privacy than Ripple/Stellar while retaining regulator visibility absent in fully private chains.</li>
          </ul>
        </section>

        <section className="mb-20" id="appendix-b">
          <h2 className="mb-6 text-2xl font-semibold tracking-[0.14em] text-slate-900">Appendix B. Regulator Access &amp; Reversibility</h2>
          <p className="mb-4 text-slate-800">
            Refers to <em>Regulator Access &amp; Transaction Reversibility</em> specification.
          </p>
          <ul className="list-disc space-y-2 pl-6 text-slate-800">
            <li>Regulators view public kernels without keys; decryption keys grant full ISO payload (pacs.008) visibility.</li>
            <li>Pre-authorized access model includes regulator keys for payments above configured thresholds; subpoena model supported via VASPs.</li>
            <li>Consensus-level finality is immutable; reversals occur via ISO pacs.004 return flows with explicit linkage and audit trails.</li>
            <li>Audit dashboards trace money flow, compliance metadata, and escalation records across VASPs.</li>
          </ul>
        </section>

        <section className="mb-20" id="appendix-c">
          <h2 className="mb-6 text-2xl font-semibold tracking-[0.14em] text-slate-900">Appendix C. Implementation Roadmap (16 Weeks)</h2>
          <p className="mb-4 text-slate-800">
            Derived from the <em>POC Implementation Plan</em>.
          </p>
          <ol className="list-decimal space-y-3 pl-6 text-slate-800">
            <li><strong>Phase 1 · Core Ledger (Weeks 1–6):</strong> Go module + CometBFT integration, payment kernel encoding, state machine, RPC services.</li>
            <li><strong>Phase 2 · CometBFT Integration (Weeks 7–9):</strong> ABCI application, four-node Docker testnet, Prometheus/Grafana observability.</li>
            <li><strong>Phase 3 · Privacy Layer (Weeks 10–12):</strong> HPKE envelope service, MinIO storage, document hash verification.</li>
            <li><strong>Phase 4 · Deterministic Netting (Weeks 13–16):</strong> Canonical greedy algorithm, NettingProof generation, 10-bank corridor simulation.</li>
          </ol>
        </section>

        <section className="mb-20" id="appendix-d">
          <h2 className="mb-6 text-2xl font-semibold tracking-[0.14em] text-slate-900">Appendix D. Technology Stack</h2>
          <p className="mb-4 text-slate-800">
            Summarizes dependencies from <em>techstack.md</em> and related specs.
          </p>
          <div className="grid gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:grid-cols-2">
            <div>
              <h3 className="mb-2 text-sm font-semibold tracking-[0.2em] text-slate-600">Consensus</h3>
              <p className="text-sm text-slate-800">cometbft/cometbft ^0.38 — BFT consensus core.</p>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-semibold tracking-[0.2em] text-slate-600">Encoding &amp; Crypto</h3>
              <p className="text-sm text-slate-800">fxamacker/cbor, cloudflare/circl (HPKE), golang.org/x/crypto/ed25519.</p>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-semibold tracking-[0.2em] text-slate-600">Storage</h3>
              <p className="text-sm text-slate-800">MinIO object store with object-lock, BadgerDB/LevelDB for state.</p>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-semibold tracking-[0.2em] text-slate-600">Observability</h3>
              <p className="text-sm text-slate-800">Prometheus ^2.45 + Grafana ^10 for validator and netting metrics.</p>
            </div>
          </div>
        </section>

        <section id="appendix-e">
          <h2 className="mb-6 text-2xl font-semibold tracking-[0.14em] text-slate-900">Appendix E. Travel Rule &amp; Compliance</h2>
          <p className="mb-4 text-slate-800">
            Key highlights from <em>travel-rule-compliance.md</em>.
          </p>
          <ul className="list-disc space-y-2 pl-6 text-slate-800">
            <li>Travel Rule metadata embedded in envelopes (`originator`, `beneficiary`, VASP identifiers, due diligence flags).</li>
            <li>Regulators can request or prereceive keys; VASPs maintain audit logs of disclosures.</li>
            <li>Risk scoring and sanctions results accompany each envelope, allowing automated stop-lists.</li>
            <li>Support for TRISA-style directory lookups and interoperable VASP attestations.</li>
          </ul>
        </section>

        <footer className="mt-24 border-t border-slate-300 pt-8 text-center text-xs uppercase tracking-[0.3em] text-slate-500">
          © {new Date().getFullYear()} Cleara Protocol Research. Prepared for institutional due diligence.
        </footer>
      </article>
    </main>
  )
}
