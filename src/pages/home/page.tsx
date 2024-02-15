import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";

import Moon from "@/models/Moon.tsx";
import Layout from "@/layouts/Layout.tsx";
import Loader from "@/components/loader/Loader.tsx";
import Sky from "@/models/Sky";
import Astroneer from "@/models/Astroneer";

const Main = () => {
    const adjustMoonForScreenSize = () => {
        let screenScale = null;
        let screenPosition = [0, -6.5, -43]
        let rotation = [0.1, 4.7, 0]

        if (window.innerWidth < 768) {
            screenScale = [0.1, 0.1, 0.1]

        } else {
            screenScale = [0.2, 0.2, 0.2]
        }
        return [screenScale, screenPosition, rotation]
    }
    const adjustAstroneerForScreenSize = () => {
        let screenScale = null;
        let screenPosition = [0, -1, -1]


        if (window.innerWidth < 768) {
            screenScale = [0.003, 0.003, 0.003]

        } else {
            screenScale = [0.006, 0.006, 0.006]
        }
        return [screenScale, screenPosition ]
    }

    const [moonScale, moonPosition, moonRotation] = adjustMoonForScreenSize()
    const [astroneerScale, astroneerPosition] = adjustAstroneerForScreenSize()

    const [isRotating, setIsRotating] = useState(false)
    return (
        <Layout>
            <div className="w-full h-screen relative ">
                <Canvas className={`${isRotating ? 'cursor-grabbing' : 'cursor-grab'} w-full h-screen bgSky`} camera={{ near: 0.1, far: 1000 }} >
                    <Suspense fallback={<Loader />}>
                        <directionalLight position={[1, 1, 1]} intensity={2} />
                        <ambientLight intensity={1} />
                        <hemisphereLight groundColor={'#000000'} intensity={0} />
                        <Astroneer
                            isRotating={isRotating}
                            astroneerPosition={astroneerPosition}
                            astroneerScale={astroneerScale}
                        />
                        <Sky />
                        <Moon
                            position={moonPosition}
                            scale={moonScale}
                            rotation={moonRotation}
                            isRotating={isRotating}
                            setIsRotating={setIsRotating}
                        />
                    </Suspense>
                </Canvas>
            </div>
        </Layout>
    );

}

export default Main;