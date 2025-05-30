"use client";
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Image } from "@react-three/drei";

const PearlaModel = React.memo(function PearlaModel(props) {
  const imageRef = useRef();

  useFrame((state) => {
    // Floating animation only
    imageRef.current.position.y = -1 + Math.sin(state.clock.elapsedTime) * 0.2;
  });

  return (
    <group
      {...props}
      ref={imageRef}
      position={[0, -1, 0]}
      scale={[3.5, 3.5, 3.5]}
      rotation={[0, 0, 0]}
    >
      <Image
        url="/images/pearla.png"
        transparent
        opacity={1}
        position={[0, 0, 0]}
        scale={[1, 1, 1]}
      />
    </group>
  );
});

export default PearlaModel; 