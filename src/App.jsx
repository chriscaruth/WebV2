import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Scroll, ScrollControls } from "@react-three/drei";
import { Interface } from "./components/Interface"
import { GlobalUIProvider } from "./context/GlobalUIContext";

const App = () =>
{
    return (
        <> 
            <Canvas shadows camera={{ position: [0, 1, 4], rotation: [0, 0, 0], fov: 40 }}>
                <ScrollControls pages={1} damping={0.1} enabled={true}>
                    <Experience />
                    <Scroll html>
                        <GlobalUIProvider>
                            <Interface/>
                        </GlobalUIProvider>  
                    </Scroll>
                </ScrollControls>
            </Canvas>
        </>
    );
}

export default App;
