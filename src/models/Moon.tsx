import { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { a } from "@react-spring/three";

import moonScene from "@/assets/3d/moon.glb";

const Moon = ({
  isRotating,
  setIsRotating,
  setCurrentStage,
  ...props
}: any) => {
  const moonRef = useRef();
  const { gl, viewport } = useThree();
  const { nodes, materials } = useGLTF(moonScene);
  const lastPosition = useRef({ x: 0, y: 0 });
  const rotationSpeed = useRef({ x: 0, y: 0 });
  const dampingFactor = 0.99;

  const handlePointerDown = (event: any) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(true);
    lastPosition.current = {
      x: event.touches ? event.touches[0].clientX : event.clientX,
      y: event.touches ? event.touches[0].clientY : event.clientY,
    };
  };

  const handlePointerUp = (event: any) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(false);
  };

  const handlePointerMove = (event: any) => {
    event.stopPropagation();
    event.preventDefault();
    if (isRotating) {
      const clientX = event.touches ? event.touches[0].clientX : event.clientX;
      const clientY = event.touches ? event.touches[0].clientY : event.clientY;
      const deltaX = (clientX - lastPosition.current.x) / viewport.width;
      const deltaY = (clientY - lastPosition.current.y) / viewport.height;
      moonRef.current.rotation.x += deltaY * 0.02;
      moonRef.current.rotation.y += deltaX * 0.02;
      lastPosition.current = { x: clientX, y: clientY };
      rotationSpeed.current = { x: deltaX * 0.02, y: deltaY * 0.02};
    }
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight" || event.code === 'KeyA' || event.code === 'KeyD' || event.key === "ArrowUp" || event.key === "ArrowDown" || event.code === 'KeyW' || event.code === 'KeyS') {
      setIsRotating(true);
      let speedX = 0;
      let speedY = 0;
      if (event.key === "ArrowRight" || event.code === 'KeyD') speedX = -0.007;
      else if (event.key === "ArrowLeft" || event.code === 'KeyA') speedX = 0.007;
      if (event.key === "ArrowUp" || event.code === 'KeyW') speedY = 0.007;
      else if (event.key === "ArrowDown" || event.code === 'KeyS') speedY = -0.007;
      rotationSpeed.current = { x: speedY, y: speedX };
      handleKeyUp(event)
    }
  };

  const handleKeyUp = (event: any) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight" || event.code === 'KeyA' || event.code === 'KeyD' || event.key === "ArrowUp" || event.key === "ArrowDown" || event.code === 'KeyW' || event.code === 'KeyS') {
      setIsRotating(false);
    }
  };

  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gl, handlePointerDown, handlePointerUp, handlePointerMove]);

  useFrame(() => {
    if (!isRotating) {
      rotationSpeed.current.x *= dampingFactor;
      rotationSpeed.current.y *= dampingFactor;
      if (Math.abs(rotationSpeed.current.x) < 0.001) {
        rotationSpeed.current.x = 0;
      }
      if (Math.abs(rotationSpeed.current.y) < 0.001) {
        rotationSpeed.current.y = 0;
      }
      moonRef.current.rotation.x += rotationSpeed.current.x;
      moonRef.current.rotation.y += rotationSpeed.current.y;
    } else {
      // Your logic for rotation based on current stage here
    }
  });

  return (
    <a.group {...props} ref={moonRef}>
      <group>
        <mesh geometry={nodes.Object_2.geometry} material={materials.MOON} />
      </group>
    </a.group>
  );
};

export default Moon;