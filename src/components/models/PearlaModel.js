'use client';

import React, { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export default function PearlaModel({ position = [0, 0, 0], scale = 1, rotation = [0, 0, 0] }) {
  const group = useRef();
  const { scene, animations } = useGLTF('/models/wizard-transformed.glb');
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (actions['Idle']) {
      actions['Idle'].play();
    }
  }, [actions]);

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group ref={group} position={position} scale={scale} rotation={rotation}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload('/models/wizard-transformed.glb'); 