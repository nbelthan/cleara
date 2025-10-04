# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Cleara** is an ISO 20022-native settlement layer for stablecoins and bank payments. This repository contains technical specifications and design documents for the protocol.

**Current Status:**
- Protocol specifications complete (in `/specs`)
- Marketing website live (in `/landing`)
- POC blockchain implementation pending (see `poc-implementation-plan.md`)

## Repository Structure

```
/
├── specs/                                 # Protocol specifications
│   ├── whitepaper.md                     # Core protocol specification
│   ├── poc-implementation-plan.md        # 16-week implementation roadmap
│   ├── privacy-architecture.md           # GDPR compliance & HPKE encryption
│   ├── blockchain-comparison.md          # Comparison with Noble, Celestia, etc.
│   ├── techstack.md                      # Technology stack decisions
│   ├── travel-rule-compliance.md         # Regulatory compliance design
│   ├── regulator-access-reversibility.md # Audit & compliance mechanisms
│   ├── cleara-differentiators-banking-controls.md  # Banking feature specifications
│   └── landing-page-spec.md              # Landing page design specification
│
└── landing/                               # Marketing website (Next.js 15)
    ├── app/
    │   ├── layout.tsx                    # Root layout with SEO metadata
    │   ├── page.tsx                      # Main landing page
    │   └── whitepaper/page.tsx           # Whitepaper reader page
    ├── components/
    │   ├── ParticleField.tsx             # 3D particle background (Three.js)
    │   ├── Hero.tsx                      # Hero section with holographic text
    │   ├── Problem.tsx, Architecture.tsx, Metrics.tsx, etc.
    │   ├── CTA.tsx                       # Call-to-action section
    │   └── Footer.tsx                    # Footer with links
    ├── package.json
    ├── README.md                         # Landing page documentation
    ├── DEPLOYMENT.md                     # Deployment and feature guide
    └── WHITEPAPER-INTEGRATION.md         # Whitepaper page documentation
```

## Core Protocol Concepts

### Two-Layer Architecture
1. **On-Chain (Public):** Minimal payment kernels (300-500B) with CBOR encoding
   - Opaque account references (32-byte hashes, no PII)
   - Cryptographic commitments to off-chain documents
   - Native multi-asset balances (no smart contracts for tokens)

2. **Off-Chain (Private):** Encrypted ISO 20022 documents
   - HPKE encryption (X25519-HKDF-SHA256 + ChaCha20-Poly1305)
   - Multi-recipient key wrapping
   - Storage in MinIO/S3 with object-lock

### Key Technical Components

**Consensus:** CometBFT (Tendermint BFT) targeting 1-3s finality

**Data Structures:**
- `PaymentKernel`: On-chain minimal object (~300-500 bytes CBOR)
- `ISOEnvelope`: Off-chain encrypted ISO 20022 document (1-5KB EXI+AEAD)
- Native asset registry with compliance hooks

**Netting Engine:** Deterministic multilateral netting with canonical greedy algorithm (Algo 0x01)
- Compression Factor (CF) target: 3-20×
- Consensus-integrated with verifiable NettingProofs
- Auto-fallback to direct settlement when CF < 2×

**Transaction Types:**
- `MsgPay`: Payment execution (pacs.008 semantics)
- `MsgReturn`: Refund path (pacs.004)
- `MsgPvP`: Atomic two-leg FX
- `MsgInstrumentCreate/Mint/Burn/Freeze/Pause`: Asset lifecycle

## Implementation Roadmap (16 weeks)

The POC implementation plan follows this sequence:

**Phase 1 (Weeks 1-6):** Core Ledger
- Go module with CometBFT
- PaymentKernel with CBOR encoding
- State machine (balances, replay protection)
- Basic RPC server

**Phase 2 (Weeks 7-9):** CometBFT Integration
- ABCI application implementation
- 4-node Docker testnet
- Prometheus metrics + Grafana dashboards

**Phase 3 (Weeks 10-12):** Privacy Layer
- HPKE encryption implementation
- MinIO envelope storage service
- doc_hash verification

**Phase 4 (Weeks 13-16):** Basic Netting
- Canonical Greedy algorithm
- NettingProof generation with Merkle trees
- Demonstration with 10-bank scenario

## Technology Stack (Planned)

**Primary Language:** Go (recommended for CometBFT integration)

**Core Dependencies:**
```yaml
Consensus:
  - cometbft/cometbft: ^0.38.0

Encoding/Crypto:
  - fxamacker/cbor: ^2.5.0              # CBOR with deterministic encoding
  - cloudflare/circl: ^1.3.0            # HPKE
  - golang.org/x/crypto/ed25519         # Signatures

Storage:
  - MinIO: ^2023.12                     # S3-compatible envelope storage
  - BadgerDB or LevelDB                 # State persistence

Monitoring:
  - Prometheus: ^2.45
  - Grafana: ^10.0
```

## Important Design Principles

1. **Privacy-First:** No PII on-chain. All identity data in encrypted off-chain envelopes.

2. **Standards-True:** On-chain objects map to ISO 20022 identifiers (pacs.008, pacs.004, pacs.002).

3. **Deterministic Performance:** BFT consensus with 1-3s hard finality. No probabilistic finality.

4. **Credible Neutrality:** Permissionless validators, inclusion-list SLA, encrypted mempool.

5. **GDPR Compliance:** Right to erasure supported (delete off-chain envelopes, on-chain only has hashes).

## POC Scope Exclusions

The following are NOT included in the 16-week POC:
- Multi-asset gas (oracle integration)
- Production slashing and governance
- Data availability sampling (DAS)
- Advanced netting with ZK proofs
- Atomic PvP FX marketplace
- IBC/cross-chain bridges
- Smart contract execution (EVM/Move)

## Performance Targets (POC)

- **Block Time:** 750ms average
- **Finality:** 1-3s (2 blocks typical)
- **Throughput:** 500 tx/s (4-node testnet)
- **Compression Factor:** 3-5× in reciprocal corridors
- **Kernel Size:** 300-500 bytes (CBOR)
- **Envelope Size:** 1-5 KB (EXI+AEAD)

## Security Considerations

**Threat Model:**
- Censoring proposers/builders
- MEV/ordering games
- DA withholding/eclipsing
- Stake concentration/long-range attacks
- Privacy leakage of remittance/identity

**Mitigations:**
- Inclusion SLA with slashing (missed inclusion = 0.5% slash + 24h jail)
- Encrypted mempool with threshold decryption
- HPKE envelopes with multi-recipient key wrapping
- Periodic state-root anchors to Ethereum/Bitcoin
- Evidence-based slashing for invalid NettingProofs

## Blockchain Comparisons

**Most Similar:** Noble (Cosmos chain for native USDC) - 85% similar
- Both use CometBFT consensus with Go
- Both have native asset model (not ERC-20 contracts)
- Both target stablecoin payments

**Key Differentiators:**
- Cleara has ISO 20022-native data model (unique)
- Cleara has consensus-integrated netting (unique)
- Cleara has HPKE-encrypted off-chain documents (unique)
- Noble focuses on USDC distribution; Cleara on settlement optimization

## When Implementation Begins

### Initial Setup Commands
```bash
# Project initialization
mkdir cleara-poc && cd cleara-poc
go mod init github.com/yourorg/cleara-poc
git init

# Install dependencies
go get github.com/cometbft/cometbft@v0.38.0
go get github.com/fxamacker/cbor/v2@v2.5.0
go get github.com/cloudflare/circl@v1.3.0

# Testing
go test ./pkg/... -cover -race            # Unit tests (target >90% coverage)
go test ./test/integration/... -tags=integration

# Docker testnet (Phase 2+)
make docker-build
make testnet-init NODES=4
docker-compose up -d
```

### Directory Structure (Planned)
```
cleara-poc/
├── cmd/
│   ├── cleara-node/          # Main node binary
│   └── envelope-service/     # Envelope storage service
├── pkg/
│   ├── types/                # PaymentKernel, Asset, AccountRef
│   ├── codec/                # CBOR encoding
│   ├── crypto/               # HPKE, Ed25519 signatures
│   ├── state/                # State machine
│   ├── tx/                   # MsgPay, MsgMint, MsgBurn
│   ├── netting/              # Canonical Greedy algorithm
│   ├── abci/                 # CometBFT integration
│   └── rpc/                  # HTTP API server
├── test/
│   ├── unit/
│   ├── integration/
│   └── scenarios/            # Netting demos, bank simulations
├── docker/
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── genesis.json
└── docs/
```

## Reference Documentation

- **Whitepaper:** `specs/whitepaper.md` - Complete protocol specification with data models, consensus, netting algorithm
- **Implementation Plan:** `specs/poc-implementation-plan.md` - Week-by-week roadmap with deliverables
- **Privacy Architecture:** `specs/privacy-architecture.md` - GDPR compliance, HPKE encryption design
- **Tech Stack:** `specs/techstack.md` - Technology decisions and rationale

## Landing Page (Marketing Website)

### Development Commands

```bash
# Navigate to landing page directory
cd landing

# Install dependencies (if needed)
npm install

# Start development server (runs on port 3001)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Linting
npm run lint

# Kill server on port 3001 (if needed)
lsof -ti:3001 | xargs kill
```

### Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS with custom utilities
- **3D Graphics:** Three.js + React Three Fiber (ParticleField component)
- **Animations:** Framer Motion (scroll-triggered animations)
- **Font:** Inter (Google Fonts)

### Key Features

1. **Particle Field Background:** 3D animated particles (3,000 points) with Three.js
2. **Holographic Effects:** CSS-based holographic text animations on logo
3. **Glassmorphic UI:** `backdrop-filter: blur(20px)` with rgba overlays
4. **Animated Metrics:** Scroll-triggered counters with Intersection Observer
5. **Network Graph:** SVG-based netting visualization (1000→150 transformation)
6. **Whitepaper Page:** Dedicated `/whitepaper` route with interactive TOC

### Architecture

**Main Page (`app/page.tsx`):**
- Assembles all section components
- Dynamically imports `ParticleField` (SSR disabled for Three.js)
- Sections: Hero → Problem → Architecture → Metrics → Netting → Privacy → Standards → CTA → Footer

**Whitepaper Page (`app/whitepaper/page.tsx`):**
- Glassmorphic card layout
- Sticky header with navigation
- Interactive table of contents
- Code syntax highlighting

**Components (`components/`):**
- Each section is self-contained
- Uses Framer Motion for scroll animations: `viewport={{ once: true }}`
- Glassmorphic styling pattern: `bg-white/5 backdrop-blur-md border border-white/10`

### Customization

**Particle Count:**
```tsx
// components/ParticleField.tsx
<Particles count={3000} /> // Adjust for performance
```

**Colors:**
```ts
// tailwind.config.ts - Extend theme colors
primary: { 500: '#00a0ff' }  // Cyan accent
```

**Animation Speed:**
```tsx
// Any component
transition={{ duration: 0.6, delay: 0.2 }}
```

### Performance Optimizations

- ParticleField loaded client-side only (no SSR)
- Reduced particle count (3,000 vs 10,000 in original spec)
- Lazy animations with `viewport={{ once: true }}`
- CSS-only effects (holographic, shimmer, glow)
- `@media (prefers-reduced-motion)` support

### Important Files

- `landing/DEPLOYMENT.md` - Comprehensive feature list and deployment guide
- `landing/WHITEPAPER-INTEGRATION.md` - Whitepaper page documentation
- `landing/README.md` - Quick start guide
- `specs/landing-page-spec.md` - Original design specification

## Important Notes (Protocol)

- This is a **payments-only blockchain** - no general-purpose smart contracts in POC
- All cryptographic operations must use deterministic encoding (CBOR CDE)
- Signatures are over canonical CBOR with signature field omitted
- Account references are opaque 32-byte hashes (not IBANs or wallet addresses)
- All ISO 20022 documents must be stored off-chain with on-chain commitments only
