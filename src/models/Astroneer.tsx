import astroneerScene from '@/assets/3d/astroneer-running.gltf'
import { useGLTF, useAnimations } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import { Vector3 } from 'three';

const Astroneer = ({isRotating, astroneerPosition, astroneerScale }) => {
    const {nodes, materials, animations} = useGLTF(astroneerScene)
    const {actions} = useAnimations(animations)
    console.log(actions)
    const astronautRef = useRef();
    const moveSpeed = 0.1; // Velocidade de movimento do astronauta
    
    console.log(animations)
    useEffect(() => {
      const handleKeyDown = (event:any) => {
        let newPosition = new Vector3().copy(astronautRef.current.position);
        switch (event.key) {
          case "ArrowUp":
          case "w":
            newPosition.z -= moveSpeed;
            break;
          case "ArrowDown":
          case "s":
            newPosition.z += moveSpeed;
            break;
          case "ArrowLeft":
          case "a":
            newPosition.x -= moveSpeed;
            break;
          case "ArrowRight":
          case "d":
            newPosition.x += moveSpeed;
            break;
          default:
            break;
        }
  
        astronautRef.current.position.copy(newPosition);
      };
  
      window.addEventListener("keydown", handleKeyDown);
  
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, []);
  
    return (
        <group  dispose={null} ref={astronautRef}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pasted__Lente_nino.geometry}
            material={materials.pasted__vidrio_astr_nina}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.broche_nino.geometry}
            material={materials.cremayera_t}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Casco_nino.geometry}
            material={materials.casco_nino_m}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pie_n_der.geometry}
            material={materials.botas_nino_m}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pie_n_izq.geometry}
            material={materials.botas_nino_m}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.polySurface4.geometry}
            material={materials.pasted__trajechico}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_5.geometry}
            material={materials.pasted__trajechico}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_5_1.geometry}
            material={materials.pasted__logonino}
          />
        </group>
      );
}
 
export default Astroneer;