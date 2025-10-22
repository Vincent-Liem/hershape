import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface BodyVisualizerProps {
  measurements: {
    chest: number;
    waist: number;
    hips: number;
    height: number;
  };
}

function BodyModel({ measurements }: BodyVisualizerProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Normalize measurements for 3D visualization
  const chestScale = measurements.chest / 35;
  const waistScale = measurements.waist / 28;
  const hipScale = measurements.hips / 38;
  const heightScale = measurements.height / 65;

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={groupRef} position={[0, -2, 0]}>
      {/* Head */}
      <mesh position={[0, 2.8 * heightScale, 0]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshPhongMaterial color="#d4a5a5" />
      </mesh>

      {/* Neck */}
      <mesh position={[0, 2.4 * heightScale, 0]}>
        <cylinderGeometry args={[0.15, 0.18, 0.4, 32]} />
        <meshPhongMaterial color="#d4a5a5" />
      </mesh>

      {/* Chest/Torso */}
      <mesh position={[0, 1.6 * heightScale, 0]}>
        <cylinderGeometry args={[chestScale * 0.45, waistScale * 0.38, 1.2, 32]} />
        <meshPhongMaterial color="#c891c8" />
      </mesh>

      {/* Hips */}
      <mesh position={[0, 0.6 * heightScale, 0]}>
        <cylinderGeometry args={[waistScale * 0.38, hipScale * 0.48, 0.8, 32]} />
        <meshPhongMaterial color="#c891c8" />
      </mesh>

      {/* Left Leg */}
      <mesh position={[-0.25, -0.5 * heightScale, 0]}>
        <cylinderGeometry args={[0.22, 0.18, 2.2 * heightScale, 32]} />
        <meshPhongMaterial color="#d4a5a5" />
      </mesh>

      {/* Right Leg */}
      <mesh position={[0.25, -0.5 * heightScale, 0]}>
        <cylinderGeometry args={[0.22, 0.18, 2.2 * heightScale, 32]} />
        <meshPhongMaterial color="#d4a5a5" />
      </mesh>

      {/* Left Arm */}
      <mesh position={[-0.7, 1.5 * heightScale, 0]} rotation={[0, 0, 0.3]}>
        <cylinderGeometry args={[0.12, 0.1, 1.6, 32]} />
        <meshPhongMaterial color="#d4a5a5" />
      </mesh>

      {/* Right Arm */}
      <mesh position={[0.7, 1.5 * heightScale, 0]} rotation={[0, 0, -0.3]}>
        <cylinderGeometry args={[0.12, 0.1, 1.6, 32]} />
        <meshPhongMaterial color="#d4a5a5" />
      </mesh>
    </group>
  );
}

export function BodyVisualizer3D({ measurements }: BodyVisualizerProps) {
  return (
    <div className="w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-muted/50 to-accent/30">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <directionalLight position={[-5, -5, -5]} intensity={0.4} />
        <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={0.5} />
        
        <BodyModel measurements={measurements} />
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={3}
          maxDistance={10}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
}
