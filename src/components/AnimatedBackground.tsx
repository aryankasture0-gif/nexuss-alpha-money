import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const GOLD = '#f7c12e';
const GOLD_SOFT = '#ffe18a';

function ParticleField() {
  const points = useRef<THREE.Points>(null);
  const count = 900;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const r = 9 + Math.random() * 18;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!points.current) return;
    points.current.rotation.y = state.clock.elapsedTime * 0.04;
    points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.12;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color={GOLD}
        transparent
        opacity={0.08}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function FloatingCrystals() {
  const group = useRef<THREE.Group>(null);

  const crystals = useMemo(
    () =>
      Array.from({ length: 9 }, (_, i) => ({
        position: [
          (Math.random() - 0.5) * 16,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 8 - 2,
        ] as [number, number, number],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI] as [
          number,
          number,
          number
        ],
        scale: 0.3 + Math.random() * 0.6,
        speed: 0.2 + Math.random() * 0.4,
        key: i,
      })),
    []
  );

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.children.forEach((child, i) => {
      child.rotation.x += crystals[i].speed * 0.003;
      child.rotation.y += crystals[i].speed * 0.004;
      child.position.y = crystals[i].position[1] + Math.sin(t * crystals[i].speed + i) * 0.4;
    });
    group.current.rotation.y = t * 0.02;
  });

  return (
    <group ref={group}>
      {crystals.map((c) => (
        <mesh key={c.key} position={c.position} rotation={c.rotation} scale={c.scale}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={GOLD}
            metalness={1}
            roughness={0.15}
            emissive={GOLD}
            emissiveIntensity={0.08}
            flatShading
          />
        </mesh>
      ))}
    </group>
  );
}

function CentralTorus() {
  const mesh = useRef<THREE.Mesh>(null);
  const wire = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (mesh.current) {
      mesh.current.rotation.x = t * 0.15;
      mesh.current.rotation.y = t * 0.22;
    }
    if (wire.current) {
      wire.current.rotation.x = -t * 0.1;
      wire.current.rotation.y = t * 0.18;
    }
  });

  return (
    <group position={[0, 0, -4]}>
      <mesh ref={mesh}>
        <torusKnotGeometry args={[2.1, 0.42, 160, 24]} />
        <meshStandardMaterial
          color={GOLD}
          metalness={1}
          roughness={0.12}
          emissive={GOLD_SOFT}
          emissiveIntensity={0.06}
        />
      </mesh>
      <mesh ref={wire} scale={1.5}>
        <icosahedronGeometry args={[2.2, 1]} />
        <meshBasicMaterial color={GOLD} wireframe transparent opacity={0.05} />
      </mesh>
    </group>
  );
}

function Rig() {
  const { pointer } = useThree();
  useFrame((state) => {
    state.camera.position.x += (pointer.x * 1.4 - state.camera.position.x) * 0.025;
    state.camera.position.y += (-pointer.y * 0.8 - state.camera.position.y) * 0.025;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

function DimmedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-navy-radial" />
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 9], fov: 55 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.2} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} color={GOLD_SOFT} />
          <directionalLight position={[-5, -3, 2]} intensity={0.3} color="#ffffff" />
          <pointLight position={[0, 0, 4]} intensity={0.4} color={GOLD} />
          <ParticleField />
          <FloatingCrystals />
          <CentralTorus />
          <Rig />
        </Canvas>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-navy-950" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(5,13,31,0.85)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-navy-950/60" />
    </div>
  );
}

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-ink-radial" />
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 9], fov: 55 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.15} />
          <directionalLight position={[5, 5, 5]} intensity={0.6} color={GOLD_SOFT} />
          <directionalLight position={[-5, -3, 2]} intensity={0.2} color="#ffffff" />
          <pointLight position={[0, 0, 4]} intensity={0.3} color={GOLD} />
          <ParticleField />
          <FloatingCrystals />
          <CentralTorus />
          <Rig />
        </Canvas>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink-950" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(5,13,31,0.65)_100%)]" />
    </div>
  );
}

export { DimmedBackground };
