import { PointMaterial, Points } from '@react-three/drei'
import { useFrame, useLoader } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { propagate } from 'satellite.js'
import {    TextureLoader } from 'three'
import { toSatRecs } from '../tles/tle-parser.ts'
import { rawTles } from '../tles/tles-example.ts'
import pointImage from './assets/dot-medium.png'
import { SCALE } from './constants.js'

export default function Satellites() {
  const satRecs = useMemo(() => toSatRecs(rawTles), [rawTles])
  const positions = useMemo(() => new Float32Array(satRecs.length * 3), [satRecs])
  const points = useRef<THREE.Points>(null)

  useFrame(() => {
    for (let i = 0; i < satRecs.length; i++) {
      const eci = propagate(satRecs[i]!, new Date())
      positions[3 * i] = (eci?.position?.x || 0) * SCALE
      positions[3 * i + 1] = (eci?.position?.y || 0) * SCALE
      positions[3 * i + 2] = (eci?.position?.z || 0) * SCALE
      points.current?.geometry.computeBoundingBox()
    }
  })

  const texture = useLoader(TextureLoader, pointImage)

  return (
    <Points ref={points} positions={positions}>
      <PointMaterial size={0.01} map={texture} transparent alphaTest={0.5} color="green" />
    </Points>
  )
}
