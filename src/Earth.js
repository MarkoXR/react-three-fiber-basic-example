import { useFrame, useLoader } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { gstime } from 'satellite.js'
import { Color, SRGBColorSpace, TextureLoader } from 'three'

const EARTH_MESH = 'EARTH_MESH'
const earthRadius = 6371 * 0.0001 // Scaled down for visualization

export function Earth() {
  const meshRef = useRef()
  const texture = useLoader(TextureLoader, 'https://satellitetracker3d.nyc3.cdn.digitaloceanspaces.com/earth-realistic-8k.webp')

  useEffect(() => {
    if (texture) {
      texture.colorSpace = SRGBColorSpace
    }
  }, [texture])

  useFrame(() => {
    if (meshRef.current) {
      const now = new Date()
      const gmst = gstime(now)
      meshRef.current.rotation.y = gmst
    }
  })

  return (
    <mesh ref={meshRef} name={EARTH_MESH} position={[0, 0, 0]}>
      <sphereGeometry args={[earthRadius, 64, 32]} />
      <meshLambertMaterial attach="material" map={texture} color={texture ? new Color('white') : 0x005f99} />
    </mesh>
  )
}
