import { Canvas, useThree } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import * as THREE from 'three';
import { Scroll, ScrollControls } from "@react-three/drei";
import { Interface } from "./components/Interface"
import { GlobalUIProvider } from "./context/GlobalUIContext";
import { useEffect } from "react";
import { useGlobalUI } from './context/GlobalUIContext';

const App = () =>
{
    return (
        <> 
            <Canvas shadows camera={{ position: [0, 1, 6], rotation: [0, 0, 0], fov: 60 }}>
                <ScrollControls pages={4} damping={0.1} enabled={true}>
                    <Experience />
                    <Scroll html>
                        <GlobalUIProvider>
                            <CameraController />
                            <Interface/>
                        </GlobalUIProvider>  
                    </Scroll>
                </ScrollControls>
            </Canvas>
        </>
    );
}

const CameraController = () => {
    const { camera } = useThree();
    const { state } = useGlobalUI();
  
    // Current position of avatar, probably need to keep track of this position in the globalUI.
    const targetPosition = new THREE.Vector3(0, 0, 0);
    const radius = camera.position.distanceTo(targetPosition);

    useEffect(() => {
        const phi = THREE.MathUtils.lerp(Math.PI / 3.14, Math.PI / 2.6, Math.min(state.scrollOffset * 4, 1000) / 1000);
        const theta = THREE.MathUtils.lerp(Math.PI * 1.1, Math.PI / 2, Math.min(state.scrollOffset * 4, 1000) / 1000);

        const newFOV = THREE.MathUtils.lerp(90, 40, Math.min(state.scrollOffset * 4, 1000) / 1000);
        camera.fov = newFOV;
        camera.updateProjectionMatrix();

        const x = targetPosition.x + radius * Math.sin(phi) * Math.cos(theta);
        const y = targetPosition.y + radius * Math.cos(phi);
        const z = targetPosition.z + radius * Math.sin(phi) * Math.sin(theta);

        camera.position.set(x, y, z);
        camera.lookAt(targetPosition);
    }, [state.scrollOffset]);

    return null;
};
  
  

export default App;
