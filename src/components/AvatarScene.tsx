import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Float, MeshDistortMaterial } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function AvatarFigure({ mousePos }: { mousePos: { x: number; y: number } }) {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (headRef.current) {
      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        mousePos.x * 0.5,
        0.05
      );
      headRef.current.rotation.x = THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        -mousePos.y * 0.3,
        0.05
      );
    }
  });

  return (
    <group ref={groupRef} position={[0, -1.2, 0]}>
      {/* Body */}
      <mesh position={[0, 0.8, 0]}>
        <capsuleGeometry args={[0.35, 0.8, 8, 16]} />
        <meshStandardMaterial color="#4a6fa5" roughness={0.6} metalness={0.2} />
      </mesh>
      {/* Shoulders */}
      <mesh position={[0, 1.3, 0]}>
        <capsuleGeometry args={[0.15, 0.9, 8, 16]} />
        <meshStandardMaterial color="#4a6fa5" roughness={0.6} metalness={0.2} />
        <mesh rotation={[0, 0, Math.PI / 2]} />
      </mesh>
      {/* Neck */}
      <mesh position={[0, 1.55, 0]}>
        <cylinderGeometry args={[0.1, 0.12, 0.15, 16]} />
        <meshStandardMaterial color="#d4a574" roughness={0.5} />
      </mesh>
      {/* Head */}
      <mesh ref={headRef} position={[0, 1.85, 0]}>
        <sphereGeometry args={[0.28, 32, 32]} />
        <meshStandardMaterial color="#d4a574" roughness={0.5} />
        {/* Eyes */}
        <mesh position={[-0.09, 0.04, 0.24]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial color="#1a1a2e" />
        </mesh>
        <mesh position={[0.09, 0.04, 0.24]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial color="#1a1a2e" />
        </mesh>
        {/* Mouth */}
        <mesh position={[0, -0.08, 0.25]}>
          <boxGeometry args={[0.1, 0.02, 0.02]} />
          <meshStandardMaterial color="#c4796e" />
        </mesh>
        {/* Hair */}
        <mesh position={[0, 0.12, -0.02]}>
          <sphereGeometry args={[0.3, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#1a1a2e" roughness={0.8} />
        </mesh>
      </mesh>
      {/* Arms */}
      <mesh position={[-0.55, 0.85, 0]} rotation={[0, 0, 0.15]}>
        <capsuleGeometry args={[0.08, 0.5, 8, 16]} />
        <meshStandardMaterial color="#4a6fa5" roughness={0.6} metalness={0.2} />
      </mesh>
      <mesh position={[0.55, 0.85, 0]} rotation={[0, 0, -0.15]}>
        <capsuleGeometry args={[0.08, 0.5, 8, 16]} />
        <meshStandardMaterial color="#4a6fa5" roughness={0.6} metalness={0.2} />
      </mesh>
    </group>
  );
}

function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 80;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#7b93db" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

function BackgroundOrb() {
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh position={[2, 1.5, -3]} scale={1.2}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color="#4a6fa5"
          roughness={0.4}
          metalness={0.3}
          distort={0.3}
          speed={1.5}
          transparent
          opacity={0.15}
        />
      </mesh>
    </Float>
  );
}

interface AvatarSceneProps {
  mousePos: { x: number; y: number };
}

export default function AvatarScene({ mousePos }: AvatarSceneProps) {
  return (
    <div className="canvas-container w-full h-full">
      <Canvas camera={{ position: [0, 1.5, 4], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.6} />
        <pointLight position={[-5, 5, 5]} intensity={0.3} color="#7b93db" />
        <spotLight position={[0, 5, 3]} angle={0.3} penumbra={0.8} intensity={0.5} />
        <AvatarFigure mousePos={mousePos} />
        <FloatingParticles />
        <BackgroundOrb />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}
