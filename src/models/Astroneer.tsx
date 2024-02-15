import astroneerScene from '@/assets/3d/astroneer.glb'
import { useGLTF } from '@react-three/drei';

const Astroneer = ({isRotating, astroneerPosition, astroneerScale }) => {
    const {scene, animations} = useGLTF(astroneerScene)
    return (<mesh position={astroneerPosition} scale={astroneerScale}>
        <primitive object={scene}/>
    </mesh> );
}
 
export default Astroneer;