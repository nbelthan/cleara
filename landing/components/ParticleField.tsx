'use client'

import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Particles({ count = 6000 }: { count?: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const particles = useMemo(() => {
    const temp: Array<{
      t: number
      factor: number
      speed: number
      xFactor: number
      yFactor: number
      zFactor: number
      mx: number
      my: number
    }> = []
    for (let i = 0; i < count; i++) {
      temp.push({
        t: Math.random() * 100,
        factor: 20 + Math.random() * 80,
        speed: 0.005 + Math.random() * 0.01,
        xFactor: -40 + Math.random() * 80,
        yFactor: -40 + Math.random() * 80,
        zFactor: -40 + Math.random() * 80,
        mx: 0,
        my: 0,
      })
    }
    return temp
  }, [count])

  const geometry = useMemo(() => new THREE.SphereGeometry(0.05, 8, 8), [])
  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color('#9fe3ff'),
        transparent: true,
        opacity: 0.28,
      }),
    []
  )

  useFrame(({ mouse }) => {
    particles.forEach((particle, i) => {
      const { factor, speed, xFactor, yFactor, zFactor } = particle
      particle.t += speed

      const s = Math.cos(particle.t)
      particle.mx = THREE.MathUtils.lerp(particle.mx, mouse.x * 20, 0.02)
      particle.my = THREE.MathUtils.lerp(particle.my, mouse.y * 20, 0.02)

      dummy.position.set(
        particle.mx + xFactor + Math.cos(particle.t + factor) + Math.sin(particle.t * 0.5) * factor * 0.05,
        particle.my + yFactor + Math.sin(particle.t + factor) + Math.cos(particle.t * 0.3) * factor * 0.05,
        zFactor + Math.sin(particle.t * 0.7) * 8
      )
      dummy.scale.setScalar(0.5 + (s + 1) * 0.18)
      dummy.rotation.set(s * 5, s * 5, s * 5)
      dummy.updateMatrix()
      mesh.current?.setMatrixAt(i, dummy.matrix)
    })
    if (mesh.current) {
      mesh.current.instanceMatrix.needsUpdate = true
    }
  })

  return <instancedMesh ref={mesh} args={[geometry, material, count]} />
}

export default function ParticleField() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 28], fov: 70 }} dpr={[1, 2]}>
        <color attach="background" args={["#03061A"]} />
        <fog attach="fog" args={["#03061A", 28, 70]} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[0, 10, 10]} intensity={0.25} color={new THREE.Color('#7fd6ff')} />
        <Particles />
        <gridHelper args={[120, 40, '#0b2034', '#061023']} position={[0, -18, 0]} rotation={[Math.PI / 2, 0, 0]} />
      </Canvas>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(140,220,255,0.06),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(171,123,255,0.05),transparent_60%)]" />
      <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'160\' height=\'160\' viewBox=\'0 0 160 160\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0H160V1H0zM0 40H160V41H0zM0 80H160V81H0zM0 120H160V121H0zM0 160H160V161H0zM0 0H1V160H0zM40 0H41V160H40zM80 0H81V160H80zM120 0H121V160H120zM160 0H161V160H160z\' fill=\'%2364c8ff\' fill-opacity=\'0.25\'/%3E%3C/svg%3E")' }} />
    </div>
  )
}
