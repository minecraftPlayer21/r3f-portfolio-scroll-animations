// src/components/Background.js
import React, { useRef, useEffect } from "react";
import { Sphere, Points, PointMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScroll } from "@react-three/drei";
import { gsap } from "gsap";

const Particles = ({ count }) => {
  const mesh = useRef();
  const particles = useRef(new Float32Array(count * 3));

  useEffect(() => {
    for (let i = 0; i < count * 3; i++) {
      particles.current[i] = (Math.random() - 0.5) * 10;
    }
  }, [count]);

  useFrame((state, delta) => {
    mesh.current.rotation.x -= delta / 10;
    mesh.current.rotation.y -= delta / 15;
  });

  return (
    <Points ref={mesh} positions={particles.current} stride={3}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.05}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
};

export const Background = () => {
  const material = useRef();
  const color = useRef({
    color: "#1f1e28", // Initial color
  });
  const data = useScroll();

  const tl = useRef();

  useFrame(() => {
    tl.current.progress(data.scroll.current);
    material.current.color = new THREE.Color(color.current.color);
  });

  useEffect(() => {
    tl.current = gsap.timeline();
    tl.current.to(color.current, {
      color: "#2c2b3f", // Slightly lighter grey
    });
    tl.current.to(color.current, {
      color: "#3b3a52", // A bit lighter
    });
    tl.current.to(color.current, {
      color: "#4a495e", // Medium grey
    });
    tl.current.to(color.current, {
      color: "#59586f", // Lighter grey
    });
  }, []);

  return (
    <group>
      <Sphere scale={[30, 30, 30]} position={[0, 0, -10]}>
        <meshBasicMaterial
          ref={material}
          side={THREE.BackSide}
          toneMapped={false}
        />
      </Sphere>
      <group position={[0, 0, -5]}>
        <Particles count={5000} />
      </group>
    </group>
  );
};

export default Background;
