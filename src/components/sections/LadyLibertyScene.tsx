"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

/**
 * A deliberately lo-fi "inflatable Lady Liberty" — capsule body + ball head
 * + crown spikes + torch. Idle sway, click-drag rotate via OrbitControls.
 */
function Inflatable() {
  const rootRef = useRef<THREE.Group>(null);

  // FIXED: idle sway runs unconditionally. The previous version had pointer
  // handlers on this group that consumed pointerdown events before OrbitControls
  // could see them — that's what broke dragging after the R3F v9 upgrade.
  // OrbitControls rotates the *camera*, this animates the *group*, so the two
  // can coexist without a "pause on drag" gate.
  useFrame((state) => {
    if (!rootRef.current) return;
    const t = state.clock.elapsedTime;
    rootRef.current.rotation.z = Math.sin(t * 0.9) * 0.06;
    rootRef.current.rotation.x = Math.sin(t * 0.6) * 0.03;
    rootRef.current.position.y = Math.sin(t * 1.5) * 0.05;
  });

  return (
    <group ref={rootRef}>
      {/* Body — bulbous inflatable */}
      <mesh position={[0, -0.4, 0]}>
        <capsuleGeometry args={[0.55, 1.4, 8, 24]} />
        <meshStandardMaterial color="#7FB6A0" roughness={0.4} metalness={0.05} />
      </mesh>

      {/* Arm holding torch */}
      <mesh position={[0.55, 0.55, 0]} rotation={[0, 0, -Math.PI / 5]}>
        <capsuleGeometry args={[0.13, 0.9, 8, 18]} />
        <meshStandardMaterial color="#7FB6A0" roughness={0.4} />
      </mesh>

      {/* Torch handle */}
      <mesh position={[1.0, 1.0, 0]} rotation={[0, 0, -Math.PI / 5]}>
        <cylinderGeometry args={[0.08, 0.12, 0.5, 16]} />
        <meshStandardMaterial color="#8B5A2B" />
      </mesh>
      {/* Torch flame */}
      <mesh position={[1.18, 1.35, 0]}>
        <coneGeometry args={[0.18, 0.5, 16]} />
        <meshStandardMaterial color="#FFD700" emissive="#FFB400" emissiveIntensity={0.7} />
      </mesh>

      {/* Tablet in other hand */}
      <mesh position={[-0.5, 0.0, 0.15]} rotation={[0, 0, 0.2]}>
        <boxGeometry args={[0.45, 0.55, 0.08]} />
        <meshStandardMaterial color="#6FA690" />
      </mesh>

      {/* Head */}
      <mesh position={[0, 0.95, 0]}>
        <sphereGeometry args={[0.38, 24, 24]} />
        <meshStandardMaterial color="#7FB6A0" roughness={0.3} />
      </mesh>

      {/* Crown spikes (7) */}
      {Array.from({ length: 7 }).map((_, i) => {
        const angle = (i - 3) * 0.25;
        return (
          <mesh
            key={i}
            position={[Math.sin(angle) * 0.35, 1.35, Math.cos(angle) * 0.35 - 0.2]}
            rotation={[Math.cos(angle) * -0.15, angle, 0]}
          >
            <coneGeometry args={[0.06, 0.35, 6]} />
            <meshStandardMaterial color="#7FB6A0" />
          </mesh>
        );
      })}

      {/* Base disc — inflatable footing */}
      <mesh position={[0, -1.25, 0]}>
        <cylinderGeometry args={[0.65, 0.75, 0.15, 24]} />
        <meshStandardMaterial color="#C8102E" />
      </mesh>

      {/* "SAUL'S" sticker on base */}
      <mesh position={[0, -1.25, 0.65]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.6, 0.18]} />
        <meshBasicMaterial color="#FFD700" side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

export default function LadyLibertyScene() {
  return (
    <div className="aspect-square w-full max-w-md mx-auto bg-saul-cream border-4 border-saul-ink shadow-card-thud cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [2.2, 1.6, 3.2], fov: 38 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 5, 2]} intensity={1.2} />
        <directionalLight position={[-3, -2, -1]} intensity={0.4} color="#FFD700" />
        <Inflatable />
        {/* FIXED: makeDefault ensures OrbitControls owns the canvas pointer input
            in R3F v9. Also enabled rotateSpeed slightly higher for a satisfying drag feel. */}
        <OrbitControls
          makeDefault
          enablePan={false}
          enableZoom={false}
          rotateSpeed={0.9}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={(2 * Math.PI) / 3}
        />
      </Canvas>
    </div>
  );
}
