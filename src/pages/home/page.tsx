import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

import Moon from "@/models/Moon.tsx";
import Layout from "@/layouts/Layout.tsx";
import Loader from "@/components/loader/Loader.tsx";

const Main = () => {
    return (
        <Layout>
            <div className="w-full h-screen relative">
                <Canvas className="w-full h-screen" camera={{ near: 0.1, far: 1000 }}>
                    <Suspense fallback={<Loader />}>
                        <directionalLight />
                        <ambientLight />
                        <pointLight />
                        <hemisphereLight />

                        <Moon />
                    </Suspense>
                </Canvas>
            </div>
        </Layout>
    );

}

export default Main;