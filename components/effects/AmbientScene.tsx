"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 520;
const ACCENT = "#00e5ff";

function generateParticlePositions() {
  const arr = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const radius = 4 + Math.random() * 3;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    arr[i * 3 + 2] = radius * Math.cos(phi);
  }
  return arr;
}

// Generated once at module load, not during component render, so the
// particle field is stable across re-renders without touching Math.random
// in the render path (React purity rules disallow that).
const PARTICLE_POSITIONS = generateParticlePositions();

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const positions = PARTICLE_POSITIONS;

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;

    // Continuous rotation, sped up slightly by how far the page has been
    // scrolled, so the scene keeps reacting to scroll everywhere, not just
    // the hero, without depending on any single section's bounds.
    const scrollY = window.scrollY;
    group.rotation.y += delta * (0.05 + Math.min(scrollY / 60000, 0.05));

    const targetX = (state.pointer.y * viewport.height) / 40;
    const targetY = (state.pointer.x * viewport.width) / 40;
    group.rotation.x += (targetX - group.rotation.x) * 0.03;
    group.rotation.z += (targetY - group.rotation.z) * 0.03;
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color={ACCENT}
          size={0.035}
          sizeAttenuation
          transparent
          opacity={0.7}
        />
      </points>
      <mesh>
        <icosahedronGeometry args={[3, 1]} />
        <meshBasicMaterial color={ACCENT} wireframe transparent opacity={0.1} />
      </mesh>
    </group>
  );
}

export function AmbientScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      frameloop="always"
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 9], fov: 45 }}
      className="!absolute inset-0"
    >
      <ParticleField />
    </Canvas>
  );
}
