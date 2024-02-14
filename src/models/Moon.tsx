import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from '@react-three/fiber'
import {a} from '@react-spring/three'

import moonScene from '@/assets/3d/moon_and_clouds.glb'

const Moon = (props: any) => {
   
    const { nodes, materials } = useGLTF(moonScene);
    const moonRef = useRef()
    return (
        <a.group {...props} ref={moonRef}>
            <group rotation={[-Math.PI / 2, 0, 0]} >
                <mesh
                    geometry={nodes.Object_2.geometry}
                    material={materials.MOON}
                />
                <mesh
                    geometry={nodes.Object_3.geometry}
                    material={materials.CLOUDS}
                />
            </group>
        </a.group>
    );
}

export default Moon
