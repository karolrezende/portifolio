import { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from '@react-three/fiber'
import { a } from '@react-spring/three'

import moonScene from '@/assets/3d/moon.glb'

const Moon = ({
    isRotating,
    setIsRotating,
    setCurrentStage,
    currentFocusPoint,
    ...props
  }) => {
        const moonRef = useRef();
      
        const { gl, viewport } = useThree();
        const { nodes, materials } = useGLTF(moonScene);
      
       
        const lastX = useRef(0);
     
        const rotationSpeed = useRef(0);
     
        const dampingFactor = 0.95;
      
        
        const handlePointerDown = (event: any) => {
          event.stopPropagation();
          event.preventDefault();
          setIsRotating(true);
      
         
          const clientX = event.touches ? event.touches[0].clientX : event.clientX;
      
         
          lastX.current = clientX;
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
      
            
            const delta = (clientX - lastX.current) / viewport.width;
      
            moonRef.current.rotation.y += delta * 0.01 * Math.PI;
      
            lastX.current = clientX;
      
            rotationSpeed.current = delta * 0.01 * Math.PI;
          }
        };
    
        const handleKeyDown = (event: any) => {
          if (event.key === "ArrowLeft") {
            if (!isRotating) setIsRotating(true);
      
            moonRef.current.rotation.y += 0.005 * Math.PI;
            rotationSpeed.current = 0.007;
          } else if (event.key === "ArrowRight") {
            if (!isRotating) setIsRotating(true);
      
            moonRef.current.rotation.y -= 0.005 * Math.PI;
            rotationSpeed.current = -0.007;
          }
        };
    
        const handleKeyUp = (event: any) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
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
 
            rotationSpeed.current *= dampingFactor;

            if (Math.abs(rotationSpeed.current) < 0.001) {
              rotationSpeed.current = 0;
            }
      
            moonRef.current.rotation.y += rotationSpeed.current;
          } else {

            const rotation = moonRef.current.rotation.y;
      

            const normalizedRotation =
              ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

            switch (true) {
              case normalizedRotation >= 5.45 && normalizedRotation <= 5.85:
                setCurrentStage(4);
                break;
              case normalizedRotation >= 0.85 && normalizedRotation <= 1.3:
                setCurrentStage(3);
                break;
              case normalizedRotation >= 2.4 && normalizedRotation <= 2.6:
                setCurrentStage(2);
                break;
              case normalizedRotation >= 4.25 && normalizedRotation <= 4.75:
                setCurrentStage(1);
                break;
              default:
                setCurrentStage(null);
            }
          }
        });
    return (
        <a.group {...props} ref={moonRef}>
            <group >
                <mesh
                    geometry={nodes.Object_2.geometry}
                    material={materials.MOON}
                />
            </group>
        </a.group>
    );
}

export default Moon
