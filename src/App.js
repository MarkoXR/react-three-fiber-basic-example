import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Earth } from './3d/Earth'


export default function App() {
  return (
    <Canvas>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <Earth position={[0, 0, 0]} />
      <OrbitControls />
    </Canvas>
  )
}
