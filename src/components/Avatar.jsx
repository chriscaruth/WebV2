import React, { useRef, useEffect, useState } from 'react'
import { useAnimations, useFBX, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion-3d';
import * as THREE from 'three';
import { useControls } from 'leva';
import { useGlobalUI } from '../context/GlobalUIContext';

export const Avatar = (props) => {
    const [ initialLoad, setInitialLoad ] = useState(true);
    const [ materialSettings, setMaterialSettings ] = useState({ wireframe: true, color: new THREE.Color(0x000000), emissive: new THREE.Color(0x000000) });
    const { animation } = props;
    const group = useRef();
    const { nodes, materials } = useGLTF('models/64fd0cb8902030ca061beeaa.glb')
    const { animations: typingAnimation } = useFBX('animations/Typing.fbx');
    const { animations: standUpAnimation } = useFBX('animations/StandUp.fbx');
    const { animations: idleAnimation } = useFBX('animations/Idle.fbx');
    const { animations: walkAnimation } = useFBX('animations/Walk.fbx');
    const controls = useControls({
        headFollow: false,
        cursorFollow: false,
        wireFrame: true
    });

    typingAnimation[0].name = "Typing";
    standUpAnimation[0].name = "StandUp";
    idleAnimation[0].name = "Idle";
    walkAnimation[0].name = "Walk";
    const {actions} = useAnimations([
        typingAnimation[0],
        standUpAnimation[0],
        idleAnimation[0],
        walkAnimation[0]]
    , group);

    useFrame((state) => {
        if (controls.headFollow) {
            group.current.getObjectByName("Head").lookAt(state.camera.position);
        }

        if (controls.cursorFollow) {
            const target = new THREE.Vector3(state.mouse.x, state.mouse.y, 4);
            group.current.getObjectByName("Head").lookAt(target);
        }
    });

    useEffect(() => {
        if (initialLoad) {
            setInitialLoad(false);
            actions[animation].reset().play();
        } else {
            actions[animation].reset().fadeIn(1).play();
        }
        return () => {
            actions[animation].reset().fadeOut(1);
        }
    }, [animation]);

    //Matrial Wireframe Intro
    useEffect(() => {
        Object.values(materials).forEach(material => {
            material.wireframe = materialSettings.wireframe;
            material.color = materialSettings.color;
            material.emissive = materialSettings.emissive;
        });
    }, [materialSettings, materials]);

    const toggleWireframe = () => {
        setMaterialSettings(prevSettings => {
            if (prevSettings.wireframe) {
                return { wireframe: false, opacity: 1, emissiveIntensity: 0 };
            } else {
                return { wireframe: true, opacity: 0.5, emissiveIntensity: 0.5 };
            }
        });
    };

    return (
        <motion.group 
            {...props} 
            ref={group} 
            dispose={null} 
            position={[0,0,-3]
        }>
            <group rotation-x={-Math.PI/2}>
                <primitive object={nodes.Hips} />
                <skinnedMesh
                    name="EyeLeft"
                    geometry={nodes.EyeLeft.geometry}
                    material={materials.Wolf3D_Eye}
                    skeleton={nodes.EyeLeft.skeleton}
                    morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
                    morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
                />
                <skinnedMesh
                    name="EyeRight"
                    geometry={nodes.EyeRight.geometry}
                    material={materials.Wolf3D_Eye}
                    skeleton={nodes.EyeRight.skeleton}
                    morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
                    morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
                />
                <skinnedMesh
                    name="Wolf3D_Head"
                    geometry={nodes.Wolf3D_Head.geometry}
                    material={materials.Wolf3D_Skin}
                    skeleton={nodes.Wolf3D_Head.skeleton}
                    morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
                    morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
                />
                <skinnedMesh
                    name="Wolf3D_Teeth"
                    geometry={nodes.Wolf3D_Teeth.geometry}
                    material={materials.Wolf3D_Teeth}
                    skeleton={nodes.Wolf3D_Teeth.skeleton}
                    morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
                    morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
                />
                <skinnedMesh
                    name="Wolf3D_Outfit_Top"
                    geometry={nodes.Wolf3D_Outfit_Top.geometry}
                    material={materials.Wolf3D_Outfit_Top}
                    skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
                    morphTargetDictionary={nodes.Wolf3D_Outfit_Top.morphTargetDictionary}
                    morphTargetInfluences={nodes.Wolf3D_Outfit_Top.morphTargetInfluences}
                />
                <skinnedMesh
                    name="Wolf3D_Outfit_Bottom"
                    geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
                    material={materials.Wolf3D_Outfit_Bottom}
                    skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
                    morphTargetDictionary={nodes.Wolf3D_Outfit_Bottom.morphTargetDictionary}
                    morphTargetInfluences={nodes.Wolf3D_Outfit_Bottom.morphTargetInfluences}
                />
                <skinnedMesh
                    name="Wolf3D_Outfit_Footwear"
                    geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
                    material={materials.Wolf3D_Outfit_Footwear}
                    skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
                    morphTargetDictionary={
                    nodes.Wolf3D_Outfit_Footwear.morphTargetDictionary
                    }
                    morphTargetInfluences={
                    nodes.Wolf3D_Outfit_Footwear.morphTargetInfluences
                    }
                />
                <skinnedMesh
                    name="Wolf3D_Body"
                    geometry={nodes.Wolf3D_Body.geometry}
                    material={materials.Wolf3D_Body}
                    skeleton={nodes.Wolf3D_Body.skeleton}
                    morphTargetDictionary={nodes.Wolf3D_Body.morphTargetDictionary}
                    morphTargetInfluences={nodes.Wolf3D_Body.morphTargetInfluences}
                />
            </group>
        </motion.group>
    )
}

useGLTF.preload('models/64fd0cb8902030ca061beeaa.glb')
