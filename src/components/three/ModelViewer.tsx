import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Center, Environment } from '@react-three/drei'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { useLoader } from '@react-three/fiber'
import * as THREE from 'three'

function DefaultModel({ color }: { color: string }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.5
  })
  return (
    <mesh ref={ref} castShadow>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} />
    </mesh>
  )
}

function STLModel({ url, color }: { url: string; color: string }) {
  const geometry = useLoader(STLLoader, url)
  const ref = useRef<THREE.Mesh>(null)
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.4
  })
  return (
    <Center>
      <mesh ref={ref} geometry={geometry} castShadow>
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.1} />
      </mesh>
    </Center>
  )
}

function OBJModel({ url, color }: { url: string; color: string }) {
  const obj = useLoader(OBJLoader, url)
  const ref = useRef<THREE.Group>(null)
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.4
  })
  obj.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      ;(child as THREE.Mesh).material = new THREE.MeshStandardMaterial({ color, roughness: 0.4 })
    }
  })
  return (
    <Center>
      <primitive ref={ref} object={obj} />
    </Center>
  )
}

interface Props {
  color?: string
  modelUrl?: string
  modelType?: 'stl' | 'obj'
  height?: string
}

export default function ModelViewer({ color = '#3B82F6', modelUrl, modelType, height = '300px' }: Props) {
  return (
    <div style={{ height }} className="w-full rounded-xl overflow-hidden bg-gray-900">
      <Canvas camera={{ position: [3, 2, 5], fov: 45 }} shadows>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={1} castShadow />
        <Environment preset="city" />
        <Suspense fallback={null}>
          {!modelUrl && <DefaultModel color={color} />}
          {modelUrl && modelType === 'stl' && <STLModel url={modelUrl} color={color} />}
          {modelUrl && modelType === 'obj' && <OBJModel url={modelUrl} color={color} />}
        </Suspense>
        <OrbitControls enablePan={false} minDistance={2} maxDistance={10} />
      </Canvas>
    </div>
  )
}
