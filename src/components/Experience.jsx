import { ContactShadows, Environment, useScroll } from "@react-three/drei";
import { Avatar } from './Avatar'
import { useFrame } from "@react-three/fiber";
import { useState } from "react";

export const Experience = () => {
    const [ animation, setAnimation ] = useState("Walk");
    const data = useScroll();

    useFrame(() => {
        if ((data.offset * data.pages) > 1) {
            setAnimation("Idle");
        }
        else {
            setAnimation("Walk");
        }
    });

    return (
        <>
            <Environment preset="warehouse" />
            <group>
                <ContactShadows opacity={.45} scale={12} blue={1} far={10} resolution={256} color="#000000" />
                <Avatar animation={animation} />
                <mesh receiveShadow scale={7} rotation-x={-Math.PI * 0.5} position-y={-0.001}>
                    <planeGeometry />
                    <meshStandardMaterial wireframe={true} color="white" />
                </mesh>
            </group>
        </>
    );
};
