"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  Sparkles,
  Text3D,
  Center,
  Environment,
  Lightformer,
} from "@react-three/drei";
import { Component, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import font from "three/examples/fonts/helvetiker_bold.typeface.json";

const PALETTE = {
  rose: "#f2a7b5",
  gold: "#e8c27a",
  plum: "#7b5cff",
  cream: "#fff4e0",
};

function Letter({
  char,
  position,
  color,
  size = 0.6,
  speed = 1.5,
}: {
  char: string;
  position: [number, number, number];
  color: string;
  size?: number;
  speed?: number;
}) {
  return (
    <Float speed={speed} rotationIntensity={1.2} floatIntensity={1.6} position={position}>
      <Center>
        <Text3D
          font={font as unknown as string}
          size={size}
          height={size * 0.35}
          curveSegments={8}
          bevelEnabled
          bevelThickness={0.03}
          bevelSize={0.02}
          bevelSegments={4}
        >
          {char}
          <meshStandardMaterial color={color} metalness={0.35} roughness={0.25} />
        </Text3D>
      </Center>
    </Float>
  );
}

function Book({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);
  const leftCover = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) ref.current.rotation.y = Math.sin(t * 0.4) * 0.5 - 0.4;
    if (leftCover.current) leftCover.current.rotation.y = -0.6 - Math.sin(t * 0.8) * 0.35;
  });
  return (
    <Float speed={1.2} floatIntensity={1.2} rotationIntensity={0.4}>
      <group ref={ref} position={position} rotation={[0.35, 0, 0.1]} scale={0.9}>
        {/* pages */}
        <mesh position={[0.62, 0, 0]}>
          <boxGeometry args={[1.2, 1.6, 0.22]} />
          <meshStandardMaterial color={PALETTE.cream} roughness={0.9} />
        </mesh>
        {/* back cover */}
        <mesh position={[0.62, 0, -0.13]}>
          <boxGeometry args={[1.26, 1.68, 0.04]} />
          <meshStandardMaterial color={PALETTE.plum} roughness={0.4} />
        </mesh>
        {/* spine */}
        <mesh position={[0, 0, -0.01]}>
          <boxGeometry args={[0.06, 1.68, 0.28]} />
          <meshStandardMaterial color={PALETTE.plum} roughness={0.4} />
        </mesh>
        {/* front cover — opens */}
        <group ref={leftCover} position={[0, 0, 0.13]}>
          <mesh position={[0.63, 0, 0]}>
            <boxGeometry args={[1.26, 1.68, 0.04]} />
            <meshStandardMaterial color={PALETTE.plum} roughness={0.4} />
          </mesh>
          <mesh position={[0.63, 0.3, 0.025]}>
            <boxGeometry args={[0.7, 0.12, 0.01]} />
            <meshStandardMaterial color={PALETTE.gold} metalness={0.8} roughness={0.2} />
          </mesh>
        </group>
      </group>
    </Float>
  );
}

function Blob() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.15;
  });
  return (
    <mesh ref={ref} position={[2.6, -0.2, -3]} scale={2.1}>
      <icosahedronGeometry args={[1, 32]} />
      <MeshDistortMaterial
        color={PALETTE.plum}
        distort={0.42}
        speed={1.6}
        roughness={0.15}
        metalness={0.2}
        transparent
        opacity={0.55}
      />
    </mesh>
  );
}

function Rig() {
  const group = useRef<THREE.Group>(null);
  const { size } = useThree();
  const scale = size.width < 860 ? 0.55 : 1;
  const scroll = useRef(0);
  useFrame(({ pointer, camera }) => {
    scroll.current = THREE.MathUtils.lerp(scroll.current, window.scrollY / window.innerHeight, 0.08);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.6, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, pointer.y * 0.4 - scroll.current * 0.6, 0.05);
    camera.lookAt(0, -scroll.current * 0.6, 0);
    if (group.current) group.current.rotation.y = scroll.current * 0.6;
  });
  return (
    <group ref={group} scale={scale}>
      <Blob />
      <Book position={[0.1, -0.2, -3]} />
      <Letter char="A" position={[-0.6, -2.6, -1]} color={PALETTE.rose} size={0.5} />
      <Letter char="B" position={[4.9, 2.4, -1.5]} color={PALETTE.gold} size={0.5} speed={2} />
      <Letter char="C" position={[5.2, -2.3, -1]} color={PALETTE.cream} size={0.4} />
      <Letter char="Hi!" position={[-5.8, 2.6, -3]} color={PALETTE.gold} size={0.4} speed={1.1} />
      <Letter char="?" position={[-5.6, -2.6, -2]} color={PALETTE.rose} size={0.5} />
      <Letter char="Aa" position={[0.4, 2.5, -3]} color={PALETTE.plum} size={0.5} />
    </group>
  );
}

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

// WebGL xətası olarsa səhnəni sadəcə gizlədir — sayt 3D-siz işləməyə davam edir.
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export default function Scene() {
  const dpr = useMemo<[number, number]>(() => [1, 1.75], []);
  const [status, setStatus] = useState<"checking" | "ok" | "off">("checking");

  useEffect(() => {
    setStatus(hasWebGL() ? "ok" : "off");
  }, []);

  if (status !== "ok") return null;

  return (
    <div className="scene" aria-hidden>
      <SceneBoundary>
        <Canvas
          dpr={dpr}
          camera={{ position: [0, 0, 7], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          onCreated={({ gl }) => {
            gl.domElement.addEventListener("webglcontextlost", () => setStatus("off"), { once: true });
          }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[4, 5, 5]} intensity={1.6} />
          <pointLight position={[-5, -2, 2]} intensity={30} color={PALETTE.rose} />
          <Environment resolution={256}>
            <Lightformer intensity={2} position={[0, 5, -5]} scale={[10, 5, 1]} color={PALETTE.cream} />
            <Lightformer intensity={1.5} position={[-5, 0, 0]} rotation-y={Math.PI / 2} scale={[8, 4, 1]} color={PALETTE.rose} />
            <Lightformer intensity={1.5} position={[5, 0, 0]} rotation-y={-Math.PI / 2} scale={[8, 4, 1]} color={PALETTE.plum} />
          </Environment>
          <Rig />
          <Sparkles count={70} scale={[14, 8, 6]} size={2.2} speed={0.35} color={PALETTE.gold} />
        </Canvas>
      </SceneBoundary>
    </div>
  );
}
