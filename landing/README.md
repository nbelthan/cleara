# Cleara Landing Page

A futuristic landing page for the Cleara Protocol - ISO 20022 Native Settlement Layer for Stablecoins.

## Features

- **Particle Field Background**: 3D animated particles using Three.js
- **Holographic Text Effects**: CSS-based holographic animations
- **Glassmorphic UI**: Modern glass effect components
- **Animated Metrics**: Dynamic counters with smooth animations
- **Network Graph Visualization**: Interactive netting demonstration
- **Scroll Animations**: Framer Motion powered scroll-triggered animations
- **Responsive Design**: Mobile-first approach

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **3D Graphics**: Three.js + React Three Fiber
- **Animations**: Framer Motion
- **Font**: Inter (Google Fonts)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Development Server

The landing page will be available at:
- Local: http://localhost:3001
- Network: http://192.168.68.52:3001

## Project Structure

```
landing/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main page component
│   └── globals.css         # Global styles
├── components/
│   ├── ParticleField.tsx   # 3D particle background
│   ├── Hero.tsx            # Hero section
│   ├── Problem.tsx         # Legacy vs Cleara comparison
│   ├── Architecture.tsx    # Two-layer architecture
│   ├── Metrics.tsx         # Performance metrics
│   ├── Netting.tsx         # Network graph visualization
│   ├── Privacy.tsx         # Privacy pillars
│   ├── Standards.tsx       # Standards badges
│   ├── CTA.tsx             # Call-to-action section
│   └── Footer.tsx          # Footer with links
├── public/                 # Static assets
├── tailwind.config.ts      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── next.config.js          # Next.js configuration
```

## Performance

- **First Contentful Paint**: < 1.5s (target)
- **60 FPS**: Smooth particle animations
- **Lazy Loading**: ParticleField loaded client-side only
- **Reduced Motion**: Respects `prefers-reduced-motion`

## Customization

### Colors

Edit `tailwind.config.ts` to change the color scheme:

```typescript
colors: {
  primary: {
    500: '#00a0ff',  // Main accent color
  },
}
```

### Particle Count

Adjust particle density in `components/ParticleField.tsx`:

```typescript
<Particles count={3000} /> // Change to 5000 for more particles
```

### Animation Delays

Modify delays in component files:

```typescript
transition={{ duration: 0.6, delay: 0.2 }}
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Accessibility

- WCAG 2.1 AA compliant
- Keyboard navigation support
- Screen reader friendly
- Reduced motion support

## License

ISC
